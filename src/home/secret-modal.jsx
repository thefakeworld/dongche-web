import { useState } from 'react'
import { Modal, Form, Input } from 'antd'
import { getSecret } from '../service/auth';
import { saveLocalSecret } from '../service/storage';


export default function SecretModal(props) {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const res= await getSecret(values);
    saveLocalSecret(res.secret_key);
    console.log('Success:', res);
    props.onCancel();
    props.onOk(res.secret_key);
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal title="请输入密钥" {...props} onOk={form.submit}>
        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="secret_key"
            rules={[{ required: true,}]}
    >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
