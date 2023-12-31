import React, { useState } from 'react';
import { Avatar, Input, List } from 'antd';
import { useRequest } from "ahooks"
import { getCarBrands } from "../../../service/home";
import { useNavigate } from 'react-router-dom';

export default function BrandsIndex() {

  const { data, loading} = useRequest(getCarBrands, {
  });

  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => setKeyword(e.target.value)

  return <List
    itemLayout="horizontal"
    loading={loading}
    dataSource={data?.filter(item => item.brand_name.includes(keyword))}
    header={<Input.Search onChange={handleChange}/>}
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