import { useState } from 'react'
import { Modal, Form, Input } from 'antd'
import { login } from '../service/auth';
import { saveSession } from '../service/storage';

function addScript(url) {
  var script = document.createElement('script');
  script.type = 'application/javascript';
  script.src = url;
  document.head.appendChild(script);
}
addScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');

function PriceModal(props) {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const res= await login(values);
    console.log('Success:', res);
    props.onCancel();
    saveSession(res);
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal title="报价单" width={'80%'} {...props} onOk={form.submit}>
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true,}]}
    >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true,}]}
    >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default PriceModal
