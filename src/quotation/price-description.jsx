import React, { useMemo, useRef } from 'react';
import { Descriptions, Image, List } from 'antd';
import { carItems, carBaseitems, carAdvanceItems } from './constant';

const useCarValueMap = (items, data) => {
  const mergeItems = useMemo(() => {
    return items.map(item => {
      return {
        ...item,
        children: data?.[item.key]
      }
    }).filter(item => item.children)
  }, [data])

  return mergeItems
}

export const CarDescription = ({ data, column=2 }) => {
  const items = useCarValueMap(carItems, data)
  return <Descriptions column={column} title="车辆信息" items={items} />
};

const BaseDescription = ({ data }) => {
  const items = useCarValueMap(carBaseitems, data)
  return <Descriptions column={1} size='small' title="基础配置" items={items} />
};

export const CarAcvanceDescription = ({ data }) => {
  const items = useCarValueMap(carAdvanceItems, data)
  return <Descriptions column={1} size='small' title="亮点配置" items={items} />
};

export const CarImageList = ({ data, onLoad }) => {
  const loadLength = useRef(0);

  const handleImageLoad = () => {
    loadLength.current += 1;
    if(loadLength.current === data?.length) {
      onLoad?.();
    }
  }
  
  return <List
    grid={{ gutter: 16, column: 1 }}
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <Image src={item} onLoad={handleImageLoad} />
      </List.Item>
    )}
  />
};

export default BaseDescription;

