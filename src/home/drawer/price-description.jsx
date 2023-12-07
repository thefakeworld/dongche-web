import React, { useMemo } from 'react';
import { Descriptions, Image, List } from 'antd';
const items = [
  {
    key: 'fuel_form',
    label: '能源类型',
    children: 'Zhou Maomao',
  },
  {
    key: 'engine_description',
    label: '发动机',
    children: '1810000000',
  },
  {
    key: 'energy_elect_max_power',
    label: '最大功率(kW)',
    children: 'Hangzhou, Zhejiang',
  },
  {
    key: 'fuel_comprehensive',
    label: '综合油耗',
    children: 'empty',
  },
  {
    key: 'engine_model',
    label: '发动机型号',
    children: 'hejiang, China',
  },
  {
    key: 'battery_type',
    label: '电池类型',
    children: 'hejiang, China',
  },
  {
    key: 'battery_capacity',
    label: '电池容量(kWh)',
    children: 'hejiang, China',
  },
  {
    key: 'constant_speed_mileage',
    label: '续航',
    children: 'hejiang, China',
  },
  {
    key: 'length_width_height',
    label: '长x宽x高(mm)',
    children: 'hejiang, China',
  },
  {
    key: 'curb_weight',
    label: '重量',
    children: 'hejiang, China',
  },
  {
    key: '5',
    label: '轮胎尺寸',
    children: 'hejiang, China',
  },
  {
    key: 'front_tire_size',
    label: '前轮尺寸',
    children: 'hejiang, China',
  },
  {
    key: 'rear_tire_size',
    label: '后轮尺寸',
    children: 'hejiang, China',
  },
];


export const CarDescription = ({ data }) => {
  const carItems = [
    {
      key: 'brand_name',
      label: '品牌',
      children: data?.brand_name,
    },
    {
      key: 'series_name',
      label: '车型',
      children: data?.series_name,
    },
    {
      key: 'official_price',
      label: '指导价',
      children: data?.official_price,
    },
    {
      key: 'car_name',
      label: '年份',
      children: data?.car_name,
    },
    {
      key: 'car_year',
      label: '年份',
      children: data?.car_year,
    },
  ];

  return <Descriptions column={2} title="车辆信息" items={carItems} />
};

const BaseDescription = ({ data }) => {

  const mergeItems = useMemo(() => {
    return items.map(item => {
      return {
        ...item,
        children: data?.[item.key]
      }
    })
  }, [data])

  return <Descriptions column={2} size='small' title="基础配置" items={mergeItems} />
};

export const CarImageList = ({ data }) => {
  return <List
    grid={{ gutter: 16, column: 1 }}
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <Image src={item} />
      </List.Item>
    )}
  />
};

export default BaseDescription;

const advanceItems = [
  {
    key: '1',
    label: '',
    children: 'Zhou Maomao',
  },
  {
    key: '2',
    label: '发动机',
    children: '1810000000',
  },
  {
    key: '3',
    label: '最大功率',
    children: 'Hangzhou, Zhejiang',
  },
  {
    key: '4',
    label: '综合油耗',
    children: 'empty',
  },
  {
    key: '5',
    label: '发动机型号',
    children: 'hejiang, China',
  },
  {
    key: '5',
    label: '电池类型',
    children: 'hejiang, China',
  },
  {
    key: '5',
    label: '电池容量',
    children: 'hejiang, China',
  },
  {
    key: '5',
    label: '续航',
    children: 'hejiang, China',
  },
  {
    key: '5',
    label: '长宽高',
    children: 'hejiang, China',
  },
  {
    key: '5',
    label: '重量',
    children: 'hejiang, China',
  },
  {
    key: '5',
    label: '轮胎尺寸',
    children: 'hejiang, China',
  },
  {
    key: '5',
    label: '前轮尺寸',
    children: 'hejiang, China',
  },
  {
    key: '5',
    label: '后轮尺寸',
    children: 'hejiang, China',
  },
];