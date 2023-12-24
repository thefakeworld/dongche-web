import { Form, Input, Select, Table, Space, Button  } from 'antd';
import React from 'react';
import { useAntdTable } from 'ahooks';

const { Option } = Select;

const fetchTableData = (params) => fetch('/api/secrets', {headers: {
  "x-secret-key": '1d7275078ce9f0c120f94e8a4ac64f1f'
}})

export default ({  api, columns, renderForm, renderHeader }) => {
  const [form] = Form.useForm();

  const getTableData = ({ current, pageSize }, formData) => {
    const query = {
      page: current,
      pageSize,
      ...formData
    }
    
    return api?.(query);
    // .then((res) => (res.data))
  };

  const { tableProps, search, params } = useAntdTable(getTableData, {
    defaultPageSize: 10,
    form,
  });

  const searchForm = (
    <div style={{ marginBottom: 16 }}>
      <Form
        name="advanced_search"
        form={form}
        layout="inline"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        // style={formStyle}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        {renderForm?.(form)}
        <Form.Item
          style={{
            textAlign: 'right',
          }}
        >
          <Space size="small">
            <Button type="primary" onClick={search.submit}>
              搜索
            </Button>
            <Button
              onClick={search.reset}
            >
              清空
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <div>
      {searchForm}
      {renderHeader?.(search)}
      <Table columns={columns} rowKey="id" {...tableProps} />
    </div>
  );
};