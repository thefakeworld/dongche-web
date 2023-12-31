import { Button, Form, Input, Space, Typography } from "antd";
import SearchTable from "../../components/search-table";
import { getSecrets, createSecrets } from "../../service/auth";
import { useRequest } from "ahooks";
import { useCallback, useState } from "react";

export default function SecretPage() {



  const columns = [
    {
      title: '密钥',
      dataIndex: 'secret_key',
      render(text){
        return <Typography.Text copyable>{text}</Typography.Text>
      }
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
    },
    {
      title: '过期时间',
      dataIndex: 'expire_at',
    },
    {
      title: '操作',
      dataIndex: 'gender',
      render() {
        return <>
          <Button size="small" type="link" disabled>重置</Button>
          <Button size="small" type="link" disabled>删除</Button>
        </>
      }
    },
  ];

  const renderForm = () => {
    return <>
      <Form.Item
        label="密钥"
        name="secret_key"
      >
        <Input />
      </Form.Item>
    </>
  }

  const { data, loading, run } = useRequest(createSecrets, {
    manual: true,
    // onSuccess: (result, params) => {
    //   if (result.success) {
    //     setState('');
    //     message.success(`The username was changed to "${params[0]}" !`);
    //   }
    // },
  });

  const [secret_key, setSecret] = useState();
  
  const renderHeader = useCallback((search) => {
    const creatKey = () => createSecrets().then(res => setSecret(res), search.reset());
    
    return <>
      <Space>
        <Button type="primary" onClick={creatKey} disabled={loading}>
          生成密钥
        </Button>
        <Typography.Text copyable>{secret_key}</Typography.Text>
      </Space>
    </>
  }, [secret_key])

  return <SearchTable columns={columns} api={getSecrets} renderForm={renderForm} renderHeader={renderHeader} />
}