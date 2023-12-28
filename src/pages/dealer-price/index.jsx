import { useState } from 'react'
import { Image, Table } from 'antd'
import { getCarSeriesPage } from '../service/home'
import { AdvancedSearchForm } from './search'
import { UserInfoForm } from './info-form'
import styles from  './index.module.less'

function HomePage() {

  const [dataSource, setDataSource] = useState([]);

  const handleSearch = async (values) => {
    const { list } = await getCarSeriesPage(values);
    setDataSource(list)
  }

  return (
    <>
      <div className={styles.home}>
        <UserInfoForm />
        <AdvancedSearchForm onSearch={handleSearch}/>
      </div>
    </>
  )
}

export default HomePage
