import { Button, Col, Form, Input, Row, Select, Space, theme } from 'antd';

const dealTypeOptions = [
  {
    label: 'cif 离岸价含保险',
    value: 'cif'
  },
  {
    label: 'fob 国内港口价',
    value: 'cif'
  },
  {
    label: 'exw 工厂提货价',
    value: 'exw'
  },
]

export const PriceForm = ({ initialValue, onSearch }) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
 
  const formStyle = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    onSearch?.(values)
  };
  return (
    <Form
      name="advanced_search"
      form={form}
      layout="horizontal"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={formStyle}
      initialValues={initialValue}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        hidden
        name="car_id"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="品牌"
        name="brand_name"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="车系"
        name="series_name"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="型号"
        name="car_name"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="配置/指导价"
        name="official_price"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="经销商价"
        name="dealer_price"
      >
        <Input />
      </Form.Item>
      <Form.Item
        hidden
        label="燃油类型"
        name="fuel_form"
      >
        <Input />
      </Form.Item>
      <Form.Item
        hidden
        label="年份"
        name="car_year"
      >
        <Input />
      </Form.Item>

      {/* <Form.Item
        label="交易方式"
        name="deal_type"
      >
        <Select options={dealTypeOptions} />
      </Form.Item> */}

      <Form.Item
        label="车价优惠"
        name="discount"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="试点通道费"
        name="channel_fee"
        initialValue={1500}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="上牌服务费"
        name="license_fee"
        initialValue={3600}
        
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="国内运费"
        name="domestic_shipping"
        initialValue={1200}
      >
        <Input addonAfter="￥" />
      </Form.Item>
      {/* <Form.Item
        label="海外运费（含报关）"
        name="shidian_tongdao_price"
      >
        <Input />
      </Form.Item> */}
      {/* 垫税成本是否自动计算10% */}
      <Form.Item
        label="垫税成本"
        name="tax_advance_rate"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="汇率"
        name="exchange_rate"
        rules={[
          { required: true }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="预计利润"
        name="estimated_profit"
        rules={[
          { required: true }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        style={{
          textAlign: 'right',
          marginLeft: 'auto',
        }}
      >
        <Space size="small">
          <Button type="primary" htmlType="submit">
            生成报价
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
    </Form>
  );
};
