import React from 'react';
import { Image, List, Space } from 'antd';
import { useRequest } from "ahooks"
import { getCarSeriesPage } from "../../../service/home";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getBrandSeriesList, getTransformSeriesList } from "../../../service/dongchedi";


export default function SeriesIndex() {

  const navigate = useNavigate();
  const params = useParams();
  
  const { data, loading } = useRequest(getBrandSeriesList, {
    onBefore(params) {
      console.log('ass params', params)
    },
    defaultParams: [{
      page: 1,
      pageSize: 99999,
      brand_id: params.id
    }]
  });

  console.log('series data', getTransformSeriesList(data));
  const list = getTransformSeriesList(data)

  return <List
    itemLayout="horizontal"
    loading={loading}
    dataSource={list}
    renderItem={(item, index) => (
      <List.Item  onClick={() => navigate('/h5/cars/'+item.series_id)}>
        <List.Item.Meta
          avatar={<Image height={30} width={45}  src={item.image_url} />}
          title={item.series_name}
        />
      </List.Item>
    )}
  />
}