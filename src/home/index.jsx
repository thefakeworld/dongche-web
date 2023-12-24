import { useMemo, useState } from 'react'
import { Button, Image, Table, Select } from 'antd'
import { getCarSeriesPage, getCarInfo } from '../service/home'
import { AdvancedSearchForm } from './search'
import styles from './index.module.less'
import PriceDrawer, { usePriceDrawer } from './drawer'

function HomePage() {
  const [dataSource, setDataSource] = useState([]);
  const drawerProps = usePriceDrawer()

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
        return <Button onClick={() => handleDrawerOpen(record)}>报价</Button>
      }
    },
  ];

  const handleSearch = async (values) => {
    const { list } = await getCarInfo(values);
    setDataSource(list)
  }
  const handleDrawerOpen = (values) => {
    drawerProps.showDrawer(values)
  }

  const carOptions = useMemo(() => {
    return dataSource?.map(item => {
      return {
        ...item,
        value: item.car_id,
        label: `${item.car_year} ${item.series_name} ${item.car_name} ${item.official_price}`
      }
    })
  }, [dataSource])

  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <div className={styles.home}>
        <PriceDrawer {...drawerProps} />
        <AdvancedSearchForm onSearch={handleSearch} />
        <Select options={carOptions} showSearch optionFilterProp="children" filterOption={filterOption} />
        {/* <Table rowKey={'car_id'} dataSource={dataSource} columns={columns} /> */}
      </div>
    </>
  )
}

export default HomePage
