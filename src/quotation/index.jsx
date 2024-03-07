import { Modal, Select, Button, Space } from 'antd'
import BaseDescription, { CarAcvanceDescription, CarDescription, CarImageList } from './price-description';
import { useState, useMemo, useRef, useEffect } from 'react';
import { useRequest } from 'ahooks';
import { calculateCarPrice, useCarData, useCarImages, useCarInfo } from './useCarInfo';
import html2pdf from '@/service/html2pdf';
import { useSearchParams } from 'react-router-dom';
import { getCarInfoList, getTransformCarInfo } from "@/service/dongchedi";
import LanguageSelect from '../components/language';
import './style.less'

function getQuery(params) {
  const paramsObj = {};
  for (const [key, value] of params) {
    // 转换为数字，如果可能的话。否则，保持为字符串
    paramsObj[key] = value;
    // paramsObj[key] = isNaN(Number(value)) ? value : Number(value);
  }
  return paramsObj
}

function QuotationPage() {

  const translate = window.translate;
  // 车辆信息 表单信息
  const [queryParams] = useSearchParams();

  const params = useMemo(() => getQuery(queryParams), [queryParams])
  // console.log('data from query', data);
  const carImages = useCarImages(params);
  // const carInfo = useCarInfo(params)
  // const carData = useCarData(params)

  const { data: carRes } = useRequest(getCarInfoList, {
    // cacheKey: 'car-info' + params.id,
    // cacheTime: 12 * 60 * 60 * 1000,
    defaultParams: [{
      car_id: params.car_id
    }]
  });
  const [carData, carInfo] = getTransformCarInfo(carRes, params.car_id)

  const [loading, setLoading] = useState(false);
  const [isImageLoaded, setImageLoaded] = useState(false);

  // const finnalPrice = useMemo(() => {
  //   if (!data) return
  //   return calculateCarPrice({
  //     // fuel_form: carInfo.fuel_form,
  //     ...data
  //   })
  // }, [data, carInfo])

  const pdfDom = useRef()

  const downloadPdf = () => {
    if(carImages) {
      if(isImageLoaded) {
        setLoading(false);
        html2pdf(pdfDom.current).then(pdf => pdf.save())
        return false;
      }else {
        setLoading(true);
        setTimeout(() => {
          downloadPdf(); // 等图片加载完
        }, 1000);
      }
    }else {
      html2pdf(pdfDom.current).then(pdf => pdf.save())
    }
  }

  const language = useRef(localStorage.getItem('to') || 'chinese_simplified')

  const changeLanguage = (value) => {
    window.translate?.changeLanguage(value)
  };

  useEffect(() => {
    if(!translate) return
    translate.execute();//进行翻译
  }, [carData, carInfo])


  return (
    <div className='quotation'>
      <div style={{paddingInline: 12, paddingTop: 12}}>
        <Space>
          <Button className='ignore' disabled={!carInfo} onClick={downloadPdf} loading={loading}>下载</Button>
          <LanguageSelect className='ignore' defaultValue={language.current} onChange={changeLanguage} />
        </Space>
      </div>
      <div ref={pdfDom} className="pdf" style={{maxWidth: 500, margin: 'auto'}}>
        <div style={{paddingInline: 12}}>
          <h3 >EXW报价：{params.price} $</h3>
          <h3 >FOB报价：{params.priceFOB} $</h3>
          <h3 >CIF报价：{params.priceCIF} $</h3>
          <CarDescription data={{...carData, ...carInfo}} column={language.current === 'chinese_simplified' ? 2 : 1 } />
          <BaseDescription data={carInfo} />
          <CarAcvanceDescription data={carInfo} />
          <CarImageList data={carImages} onLoad={() => setImageLoaded(true)} />
        </div>
      </div>
    </div>
  )
}

export default QuotationPage
