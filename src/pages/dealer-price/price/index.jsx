import { getCarInfoDetail } from '@/service/home';
import { useUpdateEffect, useRequest, useLocalStorageState, useBoolean } from 'ahooks';
import { Button, List, Form, Input, Row, Select, Space, theme, Divider, InputNumber, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { calculatePrice } from './hooks';
import './style.less'
import { useState } from 'react';
import SecretModal from '@/home/secret-modal';
import { SECRET_KEY, getLocalSecret } from '@/service/storage';

const getDiscountPrice = (carData) => {
  const officialPrice = parseFloat(carData.official_price.replace('万', '')) * 10000;
  const dealerPrice = parseFloat(carData.dealer_price.replace('万', '')) * 10000;
  // 计算车价优惠并更新输入框
  const discountValue = Math.max(0, officialPrice - dealerPrice);
  
  return Number(discountValue).toFixed(2)
}

export default function CarPriceIndex({ onSearch }) {
  const params = useParams();
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const [calcData, setCalcData] = useState();

  const [carData] = useLocalStorageState(
    'car-data',
    {
      defaultValue: {},
    },
  );

  const { data, loading } = useRequest(getCarInfoDetail, {
    cacheKey: 'brands',
    defaultParams: [{
      car_id: params.id
    }]
  });

  const formStyle = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  console.log('carData', carData);

  useUpdateEffect(() => {
    if (carData.car_id) {
      form.setFieldValue('car_discount', getDiscountPrice(carData))
    }
    console.log('car data', data);
  }, [data])


  const onFinish = (values) => {
    const res = calculatePrice(values, { ...carData, fuel_form: data.fuel_form })
    setCalcData(res);
    console.log('Received values: ', values);
    console.log('最终结果: ', res);
  };

  const navigate = useNavigate()

  const [secret] = useLocalStorageState(SECRET_KEY, {
    defaultValue: getLocalSecret(),
  },)

  const onDodnload = (values) => {
    if(!getLocalSecret()) {
      setTrue()
    }else {
      navigate(`/quotation?price=${calcData?.price}&car_id=${carData.car_id}&series_id=${carData.series_id}`)
    }
  };

  const [openState, {setFalse, setTrue}] = useBoolean();

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
        labelCol={{ xs: 8 }}
        wrapperCol={{ xs: 16}}
        // style={formStyle}
        initialValues={{ remember: true }}
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
        <div className="calc-form">
          <div>{carData.brand_name} {carData.series_name} {carData.car_name}</div>
          <div>年份：{carData.car_year} 经销商报价：{carData.dealer_price}</div>
        </div>
          <div className="calc-form">

            <Form.Item
              label="车价优惠"
              name="car_discount"
            >
              <InputNumber  addonAfter="￥"/>
            </Form.Item>
            <Form.Item
              label="试点通道费"
              name="channel_fee"
              initialValue={1500}
            >
              <InputNumber  addonAfter="￥"/>
            </Form.Item>
            <Form.Item
              label="上牌服务费"
              name="license_fee"
              initialValue={3600}

            >
              <InputNumber  addonAfter="￥"/>
            </Form.Item>
            <Form.Item
              label="国内运费"
              name="domestic_shipping"
              initialValue={1200}
            >
              <InputNumber addonAfter="￥" />
            </Form.Item>
            {/* 垫税成本是否自动计算10% */}
            <Form.Item
              label="垫税成本"
              name="tax_advance_rate"
              initialValue={0.1}
            >
              <InputNumber type='number' />
            </Form.Item>
            <Form.Item
              label="美元对人民币汇率"
              name="exchange_rate"
              required={false}
              initialValue={1.73}
              rules={[{required: true}]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="预计利润"
              name="estimated_profit"
              initialValue={0}
            >
              <InputNumber  addonAfter="$"/>
            </Form.Item>

            <Form.Item
              style={{
                textAlign: 'right',
                marginLeft: 'auto',
              }}
            >
              <Space size="small">
                <Button type="primary" htmlType="submit">
                  计算
                </Button>
                <Button
                  onClick={() => {
                    form.resetFields();
                  }}
                >
                  清空
                </Button>
              </Space>
            </Form.Item>
          </div>

          <div className="calc-form">
            <div>退税：{calcData?.tax_refund}元</div>
            <div>开票价：{calcData?.invoice_price}元</div>
            <Space>EXW报价{calcData?.price}USD <Button onClick={onDodnload} disabled={!calcData} ghost type='primary'>下载报价单</Button></Space>

          </div>
        </Spin>
      </Form>
    </>
  );
};
