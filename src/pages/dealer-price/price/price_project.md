# price Project Documentation
## 1. 项目名称
`price`
## 2. 文件结构树

```
.
├── FormItem.jsx
├── hooks.js
├── index.jsx
├── price_project.md
├── project2md_0.1.2.sh
├── style.less
└── （备份）hooks.js-2024-04-03-21-29-00

0 directories, 7 files

```
## 3. 文件内容
### 文件1: ./index.jsx

```jsx
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


const getDiscountPrice = (dealer_price, official_price) => {
  const officialPrice = parseFloat(official_price.replace('万', '')) * 10000;
  const dealerPrice = parseFloat(dealer_price.replace('万', '')) * 10000;
  // 计算车价优惠并更新输入框
  const discountValue = Math.max(0, officialPrice - dealerPrice);

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

  console.log('wiseRate', wiseRate);
  console.log('[carData, carInfo]', [carData, carInfo]);

  useUpdateEffect(() => {
    if (carData.car_id) {
      form.setFieldValue('dealer_price', carData.dealer_price)
      form.setFieldValue('car_discount', getDiscountPrice(carData.dealer_price, carInfo.official_price))
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

```

### 文件2: ./style.less

```less

.formItem {
  display: flex;
  align-items: center;
    .ant-input-number  {
      width: 100% !important;
    }
  label {
    font-weight: bold;
  }
  .unit {
    &.red {
      color: red;
    }
    &.green {
      color: green;
    }
    &.blue {
      color: blue;
    }
  }
  .extra {
    margin-top: 8px;
    height: 32px;
    vertical-align: middle;
    line-height: 32px;
  }

  .price-rmb {
    background-color: red;
  }

  .main {
    flex: 1;
  }
  column-gap: 16px;
  .top-label {
    display: flex;
    justify-content: space-between;
  }
}

.app-h5 {

  .car-info-item {
    display: flex;
    column-gap: 16px;
    align-items: center;
    .right {
      flex: 1;
    }
  }

  .car-price {
    padding-block: 16px;
    .ant-form-item {
      width: 100%;
    }
  }
  .calc-form {
    padding: 16px;
    border-radius: 4px;
    border: 1px solid #eee;
    margin-bottom: 16px;
    .ant-form-item-label {
      font-size: 14px;
      font-weight: bold;
    }
  }
}

```

### 文件3: ./FormItem.jsx

```jsx
import { PayCircleOutlined, DollarOutlined, PercentageOutlined } from '@ant-design/icons';
const unitColorMap = {
  '￥': 'red',
  '$': 'green',
  '%': 'blue',
}

const PriceRMB = () => {
  return <div className="price-rmb"><PayCircleOutlined /></div>
}

const PriceUSD = () => {
  return <div className="price-usd"><DollarOutlined /></div>
}

const Percent = () => {
  return <div className="price-percent"><PercentageOutlined /></div>
}

const componentMap = {
  '￥': PayCircleOutlined,
  '$': DollarOutlined,
  '%': PercentageOutlined,
}

export default function FormItem({ label, unit, extra, children }){

  const unitColor = unitColorMap[extra]

  const Extra = componentMap[extra]

  return <div className="formItem">
    <div className="main">
      <div className="top-label">
        <div className="title">{label}</div>
        <div className={`unit ${unitColor}`} >{unit}</div>
      </div>
      <div className="form-item">
        {children}
      </div>
    </div>
    <div className="extra"><Extra className={`unit ${unitColor}`} /></div>
  </div>
}
```

### 文件4: ./hooks.js

```javascript
export function calculatePrice(data, car_info_record) {
  try {
    
    // 从前端获取的参数，如果没有提供则使用默认值
    const car_discount = Number(data.car_discount) || 0;
    const channel_fee = Number(data.channel_fee) || 1500.0;
    const license_fee = Number(data.license_fee) || 3600.0;
    const domestic_shipping = Number(data.domestic_shipping) || 1200.0;
    const tax_advance_rate = Number(data.tax_advance_rate) || 0.1;
    const exchange_rate = Number(data.exchange_rate);
    const estimated_profit = Number(data.estimated_profit);
    const costFOB = Number(data.costFOB);
    const costCIF = Number(data.costCIF);

    // 模拟数据库查询结果
    // const car_info_record = {
    //   official_price: '20万',
    //   dealer_price: '15万',
    //   car_id: 123,
    //   series_id: 456,
    // };

    const official_price = Number(car_info_record.official_price.replace('万', '')) * 10000;
    // const dealer_price = Number(car_info_record.dealer_price.replace('万', '')) * 10000;

    // // 如果前端没有提供车价优惠，则计算得出
    // const carDiscount = car_discount || (official_price - dealer_price);

    // 开票价
    const invoice_price = (official_price - car_discount);

    // 增值税
    const vat = (invoice_price / 1.13) * 0.13;

    // 垫资成本
    const financing_cost = invoice_price * 0.7 * 30 * 0.0004;

    // 购置税
    let purchase_tax = 0;
    if (car_info_record.fuel_form && !['纯电动', '增程式', '插电式混合动力'].includes(car_info_record.fuel_form)) {
      purchase_tax = invoice_price / 11.3;  // 根据开票价来计算购置税
    }

    // 购置税税金
    const purchase_tax_tax = purchase_tax * 0.13;

    // 退税（假设等于增值税）
    const tax_refund = vat + purchase_tax;

    // 垫税成本
    const tax_advance_cost = vat * tax_advance_rate;

    // 人民币成本
    const rmb_cost = (invoice_price + purchase_tax + purchase_tax_tax + tax_advance_cost + financing_cost +
                      channel_fee + license_fee + domestic_shipping - tax_refund);

    // EXW 成本
    const exw_cost = rmb_cost / exchange_rate;

    // 最终报价
    const final_price = exw_cost + estimated_profit;
    const priceFOB = final_price + costFOB;
    const priceCIF = final_price + costFOB + costCIF;
    
    console.log(exw_cost, costFOB, costCIF);
    console.log('Price: ', {
      final_price,
      priceFOB,
      priceCIF
    });

    // 计算过程
    const calculation_details = {
      invoice_price,
      purchase_tax,
      purchase_tax_tax,
      tax_advance_cost,
      financing_cost,
      channel_fee,
      license_fee,
      domestic_shipping,
      tax_refund,
      operation: `(${invoice_price} + ${purchase_tax} + ${purchase_tax_tax} + ${tax_advance_cost} + ${financing_cost} + ${channel_fee} + ${license_fee} + ${domestic_shipping} - ${tax_refund}) / ${exchange_rate} + ${estimated_profit}`,
    };

    return { car_id: car_info_record.car_id, series_id: car_info_record.series_id, 
      invoice_price: invoice_price.toFixed(2),
      exw_cost: exw_cost.toFixed(2),
      price:final_price.toFixed(2), 
      priceFOB:priceFOB.toFixed(2), 
      priceCIF:priceCIF.toFixed(2), 
      tax_refund:tax_refund.toFixed(2), 
      calculation_details };
  } catch (error) {
    console.error('Error calculating price:', error);
    throw error;
  }
}

// // 示例使用
// const dataFromFrontend = {
//   car_name: 'YourCar',
//   car_discount: 1000,
//   channel_fee: 2000,
//   license_fee: 3000,
//   domestic_shipping: 4000,
//   tax_advance_rate: 0.2,
//   exchange_rate: 6.5,
//   estimated_profit: 5000,
// };

// calculatePrice(dataFromFrontend)

```

