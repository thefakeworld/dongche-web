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

export const UserInfoForm = ({ onSearch }) => {
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
      name="user-info"
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
        label="姓名/企业"
        name="user_name"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="联系方式"
        name="contact"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="目标国家"
        name="country"
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
