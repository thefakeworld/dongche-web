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

// const [carData] = useLocalStorageState(
//   'car-data',
//   {
//     defaultValue: {},
//   },
// );


const getDiscountPrice = (dealer_price_value, official_price) => {
  if(!dealer_price_value && !official_price) return 0
  const officialPrice = parseFloat(official_price.replace('万', '')) * 10000;
  // const dealerPrice = parseFloat(dealer_price.replace('万', '')) * 10000;
  // 计算车价优惠并更新输入框
  const discountValue = Math.max(0, officialPrice - dealer_price_value);

  return Number(discountValue).toFixed(2)
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
  const initialDiscountPrice = getDiscountPrice(carData?.dealer_price_value * 10000, carInfo?.official_price)
  
  console.log('wiseRate', wiseRate);
  console.log('[carData, carInfo]', [carData, carInfo]);

  const handleDealerPriceChange = () => {
    const dealer_price_value = form.getFieldValue('dealer_price')
    form.setFieldValue('car_discount', getDiscountPrice(dealer_price_value, carInfo.official_price))
  }

  useUpdateEffect(() => {
    if (carData.car_id) {
      const dealer_price_value = carData.dealer_price_value * 10000;
      form.setFieldValue('dealer_price', dealer_price_value)
      console.log('车优惠', getDiscountPrice(dealer_price_value, carInfo.official_price));
      form.setFieldValue('car_discount', getDiscountPrice(dealer_price_value, carInfo.official_price))
    }

    if (wiseRate) {
      form.setFieldValue('exchange_rate', wiseRate.value)
    }
  }, [data, wiseRate])

  const onFinish = (values) => {
    const res = calculatePrice(values, { dealer_price: carData.dealer_price, official_price: carInfo.official_price, fuel_form: carInfo.fuel_form })
    setCalcData(res);
    console.log('Received values: ', values);
    console.log('最终结果: ', res);
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
      <SecretModal open={openState} onCancel={setFalse} onOk={onDodnload} />
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
      >

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
                    <FormItem label="Discount" unit="RMB" extra="￥">
                      <Form.Item
                        label="车价优惠"
                        name="car_discount"
                        readOnly
                        initialValue={initialDiscountPrice}
                      >
                        <InputNumber />
                      </Form.Item>
                    </FormItem>
                    <FormItem label="Dealer Price" unit="RMB" extra="￥">
                      <Form.Item
                        label="经销商报价"
                        name="dealer_price"
                        initialValue={carData?.dealer_price_value * 10000}
                      >
                        <Input onChange={handleDealerPriceChange} />
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
                onClick={() => {
                  form.resetFields();
                }}
              >
                恢复默认
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
