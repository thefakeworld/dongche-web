import { useState } from 'react'
import { Button, Image, Table } from 'antd'
import { getCarSeriesPage, getCarInfo } from '../service/home'
import { AdvancedSearchForm } from './search'
import styles from  './index.module.less'
import PriceModal from './price-modal'

function HomePage() {
  const [state, setState] = useState({})
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: '品牌',
      dataIndex: 'brand_name',
      key: 'brand_name',
    },
    {
      title: '车系',
      dataIndex: 'series_name',
      key: 'series_name',
    },
    {
      title: '型号',
      dataIndex: 'car_name',
      key: 'car_name',
    },
    {
      title: '年份',
      dataIndex: 'car_year',
      key: 'car_year',
    },
    {
      title: '级别',
      dataIndex: 'series_type',
      key: 'series_type',
    },
    // {
    //   title: '图片',
    //   dataIndex: 'cover_url',
    //   key: 'cover_url',
    //   render(value) {
    //     return <Image sizes='100' src={value} />
    //   }
    // },
    {
      title: '经销商报价',
      dataIndex: 'dealer_price',
      key: 'dealer_price',
    },
    {
      title: '官方报价',
      dataIndex: 'official_price',
      key: 'official_price',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render(text, record) {
        return <Button onClick={() => handleOpen(record)}>报价单</Button>
      }
    },
  ];

  const handleSearch = async (values) => {
    const {list} = await getCarInfo(values);
    setDataSource(list)
  }
  const handleOpen = (values) => {
    setState({
      open: true,
      data: values
    })
  }

  const handleClose = () => setState({open: false})


  return (
    <>
      <div className={styles.home}>
        <PriceModal onOk={handleClose} onCalcel={handleClose} {...state} />
        <AdvancedSearchForm onSearch={handleSearch}/>
        <Table rowKey={'id'} dataSource={dataSource} columns={columns} />
      </div>
    </>
  )
}

export default HomePage
