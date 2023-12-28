import React from 'react';
import { Image, List, Space } from 'antd';
import { useRequest } from "ahooks"
import { getCarSeriesPage } from "../../../service/home";
import { useLocation, useNavigate, useParams } from 'react-router-dom';


const data2 = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];


export default function SeriesIndex() {

  const navigate = useNavigate();
  const params = useParams();
  
  console.log(params);
  const { data, loading } = useRequest(getCarSeriesPage, {
    onBefore(params) {
      console.log('ass params', params)
    },
    defaultParams: [{
      page: 1,
      pageSize: 99999,
      brand_id: params.id
    }]
  });


  return <List
    itemLayout="horizontal"
    loading={loading}
    dataSource={data?.list}
    renderItem={(item, index) => (
      <List.Item  onClick={() => navigate('/h5/cars/'+item.id)}>
        <List.Item.Meta
          avatar={<Image height={30} width={45}  src={item.cover_url} />}
          title={item.outter_name}
        />
      </List.Item>
    )}
  />
}