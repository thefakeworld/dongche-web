import React from 'react';
import { Avatar, List, Space, message } from 'antd';
import { useRequest, useLocalStorageState } from "ahooks"
import { getCarInfo } from "../../../service/home";
import { useLocation, useNavigate, useParams } from 'react-router-dom';


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

  const { data, loading } = useRequest(getCarInfo, {
    defaultParams: [{
      page: 1,
      pageSize: 99999,
      series_id: params.id
    }]
  });


  return <List
    itemLayout="horizontal"
    loading={loading}
    dataSource={data?.list}
    renderItem={(item, index) => (
      <List.Item extra={item.dealer_price} onClick={() => {
        if(item.dealer_price == '暂无报价') {
          return message.info('暂无报价')
        }
        setCarData(item); 
        navigate('/h5/price/'+item.car_id)
      }}>
        <List.Item.Meta
          title={item.car_name}
          description={<Space>年份：{item.car_year}</Space>}
        />
      </List.Item>
    )}
  />
}