import { useState } from 'react'
import { Modal, Form, Input } from 'antd'
import { login } from '@/service/auth';
import { saveSession } from '@/service/storage';

function LoginModal(props) {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const res = await login(values);
    console.log('Success:', res);
    props.onCancel();
    saveSession(res);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal title="请登录" {...props} onOk={form.submit}>
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
            rules={[{ required: true, }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default LoginModal
