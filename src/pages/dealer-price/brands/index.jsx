import React, { useMemo, useState } from 'react';
import { Avatar, Input, List, Anchor, Row, Col } from 'antd';
import { useRequest } from "ahooks"
import { getCarBrands } from "../../../service/home";
import { getAllCarBrand } from "../../../service/dongchedi";
import styles from  './index.module.less'

import { useNavigate } from 'react-router-dom';

export default function BrandsIndex() {

  // const { data } = useRequest(getCarBrands, {
  // });
  const { data: brandRes, loading } = useRequest(getAllCarBrand, {
    cacheKey: 'brands',
    cacheTime: 1000 * 60*60*12
  });

  const allBrandData = brandRes?.data?.brand;

  const pinyinList = useMemo(() => {
    return allBrandData?.filter(item => item.type === 1000).map(item => ({
      key: item.info.pinyin,
      href: "#" + item.info.pinyin,
      title: item.info.pinyin,
    }))
  }, [allBrandData])


  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => setKeyword(e.target.value)

  return (
    <>
      <Input.Search onChange={handleChange} placeholder='请输入品牌' style={{marginBlock: 16}}/>
      <Row>
        <Col span={22}>
          <List
            className={styles.list}
            itemLayout="horizontal"
            loading={loading}
            dataSource={keyword ? allBrandData?.filter(item => item.info.brand_name?.includes(keyword)) : allBrandData}
            // header={<Input.Search onChange={handleChange} />}
            renderItem={(item, index) => {
              const {brand_id, brand_name, image_url, pinyin } = item.info
              if(item.type === 1000) {
                return <div key={pinyin} id={pinyin}>{pinyin}</div>
              }
              return (
                <List.Item onClick={() => navigate('/h5/series/' + brand_id)}>
                  <List.Item.Meta
                    avatar={<Avatar src={image_url} />}
                    title={brand_name}
                  />
                </List.Item>
              )
            }}
          />
        </Col>
        <Col span={2}>
          <Anchor
            getContainer={() => document.querySelector('.app-h5')}
            items={pinyinList}
          />
        </Col>
      </Row>
    </>
  )

}