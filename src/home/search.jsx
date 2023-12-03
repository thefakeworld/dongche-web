import { Button, Col, Form, Input, Row, Select, Space, theme } from 'antd';

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
      layout="inline"
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
        label="车系"
        name="series_name"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="年份"
        name="car_year"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="经销商报价"
        name="dealer_price"
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={{
          textAlign: 'right',
          // marginLeft: 'auto',
        }}
      >
        <Space size="small">
          <Button type="primary" htmlType="submit">
            搜索
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
