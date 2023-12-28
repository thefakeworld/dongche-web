import React from 'react';
import { Avatar, List, Space } from 'antd';
import { useRequest } from "ahooks"
import { getCarInfo } from "../../../service/home";
import { useLocation, useParams } from 'react-router-dom';


export default function CarsIndex() {
  // const location = useLocation();

  const params = useParams();
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
      <List.Item extra={item.dealer_price}>
        <List.Item.Meta
          title={item.car_name}
          description={<Space>年份：{item.car_year}</Space>}
        />
      </List.Item>
    )}
  />
}