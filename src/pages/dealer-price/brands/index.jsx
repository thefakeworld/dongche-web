import React from 'react';
import { Avatar, List } from 'antd';
import { useRequest } from "ahooks"
import { getCarBrands } from "../../../service/home";
import { useNavigate } from 'react-router-dom';

export default function BrandsIndex() {

  const { data, loading} = useRequest(getCarBrands, {
  });

  const navigate = useNavigate();

  return <List
    itemLayout="horizontal"
    loading={loading}
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item onClick={() => navigate('/h5/series/'+item.brand_id)}>
        <List.Item.Meta
          avatar={<Avatar src={item.image_url} />}
          title={item.brand_name}
        />
      </List.Item>
    )}
  />
}