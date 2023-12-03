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

export const AdvancedSearchForm = ({ onSearch }) => {
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
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="品牌"
        name="brand_name"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="车型"
        name="outter_name"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="配置/指导价"
        name="office_price"
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
        name="coupon_price"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="试点通道费"
        name="shidiantongdao_price"
        initialValue={1500}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="上牌服务费"
        name="shangpai_price"
        initialValue={3600}
        
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="国内运费"
        name="shidian_tongdao_price"
        initialValue={1200}
      >
        <Input addonAfter="￥" />
      </Form.Item>
      <Form.Item
        label="海外运费（含报关）"
        name="shidian_tongdao_price"
      >
        <Input />
      </Form.Item>
      {/* 垫税成本是否自动计算10% */}
      <Form.Item
        label="垫税成本"
        name="shidian_tongdao_price"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="预计利润"
        name="profit_price"
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
