import React, { useEffect } from 'react';
import { Avatar, List, Space, message } from 'antd';
import { useRequest, useLocalStorageState } from "ahooks"
import { getCarInfo } from "../../../service/home";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getSeriesCarList, getTransformSeriesCarList } from "../../../service/dongchedi";


export default function CarsIndex() {
  // const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const [carData, setCarData] = useLocalStorageState(
    'car-data',
    {
      defaultValue: {},
    },
  );

  const { data, loading } = useRequest(getSeriesCarList, {
    defaultParams: [{
      page: 1,
      pageSize: 99999,
      series_id: params.id
    }]
  });

  const list = getTransformSeriesCarList(data)

  return <List
    itemLayout="horizontal"
    loading={loading}
    dataSource={list}
    renderItem={(item) => (
      <List.Item extra={item.dealer_price} onClick={() => {
        if(item.dealer_price == '暂无报价') {
          return message.info('暂无报价')
        }
        setCarData(item); 
        navigate('/h5/price/'+item.id)
      }}>
        <List.Item.Meta
          title={item.name}
          description={<Space>年份：{item.year}</Space>}
        />
      </List.Item>
    )}
  />
}