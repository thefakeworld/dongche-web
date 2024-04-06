import { getCarInfoDetail } from '@/service/home';
import { useUpdateEffect, useRequest, useLocalStorageState, useBoolean } from 'ahooks';
import { Button, List, Form, Input, Row, Select, Space, Tabs, Divider, InputNumber, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { calculatePrice } from './hooks';
import './style.less'
import { useState } from 'react';
import SecretModal from '@/home/secret-modal';
import { SECRET_KEY, getLocalSecret } from '@/service/storage';
import { getCarInfoList, getTransformCarInfo, getWiseRate } from "../../../service/dongchedi";
import { RightOutlined } from '@ant-design/icons';
import FormItem from './FormItem';

//独立的计算按钮方法依赖
import { calculatePriceUsingFormValues } from './calculateFormValues';


// const [carData] = useLocalStorageState(
//   'car-data',
//   {
//     defaultValue: {},
//   },
// );




// const getDiscountPrice = (dealer_price, official_price) => {
//   const officialPrice = parseFloat(official_price.replace('万', '')) * 10000;
//   const dealerPrice = parseFloat(dealer_price.replace('万', '')) * 10000;
//   // 计算车价优惠并更新输入框
//   const discountValue = Math.max(0, officialPrice - dealerPrice);

//   return Number(discountValue).toFixed(2)
// }



// 1.改为以下了，因为dongchedi.js那边进行预处理了
const getDiscountPrice = (dealer_price, official_price) => {
  // 如果 official_price 依然是带有'万'字符串的格式，则替换; 否则直接使用
  const officialPrice = typeof official_price === 'string' ? parseFloat(official_price.replace('万', '')) * 10000 : official_price;
  const dealerPrice = dealer_price;  // 直接使用新的格式
  // 计算车价优惠并更新输入框
  const discountValue = Math.max(0, officialPrice - dealerPrice);

  return Number(discountValue).toFixed(2);
}



export default function CarPriceIndex() {
  const params = useParams();
  const [form] = Form.useForm();
  const [calcData, setCalcData] = useState();
  const navigate = useNavigate();
  const [openState, { setFalse, setTrue }] = useBoolean();

  const { data, loading } = useRequest(getCarInfoList, {
    // cacheKey: 'car-info' + params.id,
    // cacheTime: 12 * 60 * 60 * 1000,
    defaultParams: [{
      car_id: params.id
    }]
  });
  const [carData, carInfo] = getTransformCarInfo(data, params.id)
  const { data: wiseRate } = useRequest(getWiseRate);

  console.log('wiseRate', wiseRate);
  console.log('[carData, carInfo]', [carData, carInfo]);





  // useUpdateEffect(() => {
  //   if (carData.car_id) {
  //     form.setFieldValue('dealer_price', carData.dealer_price)
  //     form.setFieldValue('car_discount', getDiscountPrice(carData.dealer_price, carInfo.official_price))
  //   }

  //   if (wiseRate) {
  //     form.setFieldValue('exchange_rate', wiseRate.value)
  //   }
  // }, [data, wiseRate])


// 2.改了，确保 useUpdateEffect 同步表单数据时不会覆盖用户输入
// 只有当 carData 数据变化且用户未修改 dealer_price 字段时，才更新表单域的 dealer_price。使用 form.isFieldTouched 方法来检查字段是否被用户触碰
// 这块然后就到hook.js的部分了
// 移除或注释掉下面的对dealer_price的设置
useUpdateEffect(() => {
  if (carData.car_id && !form.isFieldTouched('dealer_price')) {
    // form.setFieldValue('dealer_price', carData.dealer_price); // 注释掉这条代码，避免覆盖
    form.setFieldValue('car_discount', getDiscountPrice(carData.dealer_price, carInfo.official_price));
  }

  if (wiseRate) {
    form.setFieldValue('exchange_rate', wiseRate.value);
  }
}, [carData, carInfo, wiseRate]);


// 新建一个计算按钮专用函数
const handleCalculate = (values) => {
  // 直接使用表单的values进行计算，不依赖 carData 或 carInfo 中的默认值
  const res = calculatePrice({
    dealer_price: values.dealer_price,  // 使用用户从表单输入的经销商报价
    channel_fee: values.channel_fee,  // 使用用户从表单输入的试点通道费
    license_fee: values.license_fee,  // 使用用户从表单输入的上牌服务费
    domestic_shipping: values.domestic_shipping,  // 使用用户从表单输入的国内运费
    tax_advance_rate: values.tax_advance_rate,  // 使用用户从表单输入的垫税成本
    exchange_rate: values.exchange_rate,  // 使用用户从表单输入的汇率
    estimated_profit: values.estimated_profit,  // 使用用户从表单输入的预计利润
    costFOB: values.costFOB,  // 使用用户从表单输入的FOB成本
    costCIF: values.costCIF,  // 使用用户从表单输入的CIF成本
    // 确保添加了所有其他相关的表单值...
    official_price: carInfo.official_price, // 这个值可能来自加载的车辆信息，如果也可以编辑则应从表单获取
    fuel_form: carInfo.fuel_form  // 同上
  });
  setCalcData(res);
  console.log('Calculated result with form values: ', res);
};


// 更新现有 onFinish 函数以使用新的 handleCalculate 函数
// 修改的onFinish函数
const onFinish = (values) => {
  // 使用新的独立函数来计算价格
  const res = calculatePriceUsingFormValues(values);
  setCalcData(res); // 更新状态以反映计算结果
  console.log('Received values: ', values);
  console.log('Calculated result: ', res);
};
// 上面原来的是下面这个
  // const onFinish = (values) => {
  //   // 使用values对象中的值而不是carData的值
  //   const res = calculatePrice(values, {
  //     dealer_price: values.dealer_price, // 使用用户输入的值
  //     official_price: carInfo.official_price, // 假设这个值不是从用户的输入获取，而是从加载的carInfo对象中获取
  //     fuel_form: carInfo.fuel_form // 同上
  //   });
  //   setCalcData(res);
  //   console.log('Received values: ', values);
  //   console.log('最终的计算结果: ', res);
  // };

  // "恢复默认"按钮的事件处理函数
  const handleResetToDefaults = () => {
    // 使用服务端获得的数据重置表单字段
    form.setFieldsValue({
      dealer_price: carData?.dealer_price,
      channel_fee: 1500, // 填入其它各项默认值
      license_fee: 3600,
      domestic_shipping: 1200,
      tax_advance_rate: 0.1,
      exchange_rate: wiseRate?.value,
      estimated_profit: 0,
      costFOB: 500,
      costCIF: 0,
      // 注意：如果 official_price 或 fuel_form 也需要重置，同理处理
    });
  };

  const onDodnload = (values) => {
    if (!getLocalSecret()) {
      setTrue()
    } else {
      navigate(`/quotation?price=${calcData?.price}&car_id=${carData.car_id}&series_id=${carData.series_id}`)
    }
  };


  return (
    <>
      <Form
      className='car-price'
      name="advanced_search"
      form={form}
      layout="horizontal"
      labelCol={{ xs: 14 }}
      wrapperCol={{ xs: 10 }}
      onFinish={onFinish} // 使用更新过的 onFinish 函数
      autoComplete="off"
      >
      {/* <SecretModal open={openState} onCancel={setFalse} onOk={onDodnload} />
      <Form
        className='car-price'
        name="advanced_search"
        form={form}
        // layout="inline"
        // layout="vertical"
        layout="horizontal"
        labelCol={{ xs: 14 }}
        wrapperCol={{ xs: 10 }}
        // style={formStyle}
        onFinish={onFinish}
        autoComplete="off"
      > */}

        {/* <Form.Item
          label="交易方式"
          name="deal_type"
        >
          <Select options={dealTypeOptions} />
        </Form.Item> */}
        <Spin spinning={loading}>
          <div className="car-info-item">
            <div className="left">
              <div className="title">
                <b>选择车型</b>
              </div>
              <div className="label">Selecting Model</div>
            </div>
            <div className="right" onClick={() => history.back()}>
              <div>{carData.series_name} </div>
              <div>{carData.car_year}款 {carData.car_name}</div>
            </div>
            <div className="extra" onClick={() => history.back()}>
              <RightOutlined />
            </div>
          </div>
          <Tabs
            defaultActiveKey="1"
            centered
            items={[
              {
                label: `EXW`,
                key: '1',
                children: (
                  <div className="">

                    {/* <FormItem label="Discount" unit="RMB" extra="￥">
                      <Form.Item
                        label="车价优惠"
                        name="car_discount"
                        initialValue={0}
                        hidden
                      >
                        <InputNumber />
                      </Form.Item>
                    </FormItem> */}

                    <FormItem label="Dealer Price" unit="RMB" extra="￥">
                      <Form.Item
                        label="经销商报价"
                        name="dealer_price"
                        initialValue={carData?.dealer_price}
                      >
                        {/* <Input readOnly/> //只读 */}
                        <InputNumber />
                      </Form.Item>
                    </FormItem>
                    
                    <FormItem label="Pilot Channel Fee" unit="RMB" extra="￥">
                      <Form.Item
                        label="试点通道费"
                        name="channel_fee"
                        initialValue={1500}
                      >
                        <InputNumber />
                      </Form.Item>
                    </FormItem>

                    <FormItem label="Registration Service Fee" unit="RMB" extra="￥">
                      <Form.Item
                        label="上牌服务费"
                        name="license_fee"
                        initialValue={3600}

                      >
                        <InputNumber />
                      </Form.Item>
                    </FormItem>
                    <FormItem label="Domestic Shipping Cost" unit="RMB" extra="￥">
                      <Form.Item
                        label="国内运费"
                        name="domestic_shipping"
                        initialValue={1200}
                      >
                        <InputNumber />
                      </Form.Item>
                    </FormItem>
                    {/* 垫税成本是否自动计算10% */}
                    <FormItem label="Prepaid Tax Cost" extra="%">
                      <Form.Item
                        label="垫税成本"
                        name="tax_advance_rate"
                        initialValue={0.1}
                      >
                        <InputNumber type='number' />
                      </Form.Item>
                    </FormItem>
                    <FormItem label="USD to CNY Exchange Rate" extra="%">
                      <Form.Item
                        label="美元对人民币汇率"
                        name="exchange_rate"
                        required={false}
                        initialValue={wiseRate?.value}
                        rules={[{ required: true }]}
                      >
                        <InputNumber />
                      </Form.Item>
                    </FormItem>
                    <FormItem label="Estimated Profit" unit="USD" extra="$">
                      <Form.Item
                        label="预计利润"
                        name="estimated_profit"
                        initialValue={0}
                      >
                        <InputNumber />
                      </Form.Item>
                    </FormItem>
                  </div>
                ),
              },
              {
                label: `FOB`,
                key: '2',
                forceRender: true,
                children: (
                  <FormItem label="FOB Cost" unit="USD" extra="$">
                    <Form.Item
                      label="FOB 成本"
                      name="costFOB"
                      initialValue={500}
                    >
                      <InputNumber />
                    </Form.Item>
                  </FormItem>
                ),
              }, {
                label: `CIF`,
                key: '3',
                forceRender: true,
                children: (
                  <FormItem label="CIF Cost" unit="USD" extra="$">
                    <Form.Item
                      label="CIF 成本"
                      name="costCIF"
                      initialValue={0}
                    >
                      <InputNumber />
                    </Form.Item>
                  </FormItem>
                ),
              }
            ]}
          />
          <Form.Item
            style={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >


            <Space size="small" align='end' >
              <Button type="primary" htmlType="submit">
                计算
              </Button>



            <Button
              danger
              type="primary"
              onClick={handleResetToDefaults}
            >
              填入建议值
            </Button>



            </Space>
          </Form.Item>
        </Spin>
      </Form>
      <Form
        className='calc-form'
        name="calc-form"
        layout="horizontal"
        labelCol={{ xs: 14 }}
        wrapperCol={{ xs: 10 }}
      >
        <FormItem label="Tax Refund" unit="RMB" extra="￥">
          <Form.Item
            label="退税"
            name="tax_refund"
          >
            <div>
              <InputNumber readOnly value={calcData?.tax_refund} />
            </div>
          </Form.Item>
        </FormItem>
        <FormItem label="Invoice Price" unit="RMB" extra="￥">
          <Form.Item
            label="开票价"
            name="invoice_price"
          >
            <div>
              <Input readOnly value={calcData?.invoice_price} />
            </div>
          </Form.Item>
        </FormItem>
        <FormItem label="EXW Price" unit="USD" extra="$">
          <Form.Item
            label="EXW报价"
            name="price"
          >
            <div>
              <Input readOnly value={calcData?.price} />
            </div>
          </Form.Item>
        </FormItem>
        <FormItem label="FOB Price" unit="USD" extra="$">
          <Form.Item
            label="FOB报价"
            name="priceFOB"
          >
            <div>
              <Input readOnly value={calcData?.priceFOB} />
            </div>
          </Form.Item>
        </FormItem>
        <FormItem label="CIF Price" unit="USD" extra="$">
          <Form.Item
            label="CIF报价"
            name="priceCIF"
          >
            <div>
              <Input readOnly value={calcData?.priceCIF} />
            </div>
          </Form.Item>
        </FormItem>
        <Button block onClick={onDodnload} disabled={!calcData} type='primary'>生成报价单</Button>
      </Form>
    </>
  );
}
