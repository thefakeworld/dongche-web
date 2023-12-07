import { Modal, Form, Button, Space } from 'antd'
import BaseDescription, { CarDescription, CarImageList } from './price-description';
import { useMemo, useRef } from 'react';
import { calculateCarPrice, useCarImages } from './useCarInfo';
import html2pdf from '@/service/html2pdf';

function PriceModal({ carInfo, data, ...props }) {

  // 车辆信息 表单信息
  const carImages = useCarImages(data);

  const onOk = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const finnalPrice = useMemo(() => {
    if (!data) return
    return calculateCarPrice({
      fuel_form: carInfo.fuel_form,
      ...data
    })
  }, [data])

  const pdfDom = useRef()

  const downloadPdf = () => {
    html2pdf(pdfDom.current, true).then(pdf => pdf.save())
  }

  return (
    <>
      <Modal title="报价单" width={'80%'} onCancel={onOk} {...props}>
        <div style={{padding: 12}}><Button onClick={downloadPdf} >下载</Button></div>
        
        <div ref={pdfDom} className="pdf" >
          <div style={{width: 640}}>
            <h3 className="final">EXW美金价格：{finnalPrice} $</h3>
            <CarDescription data={data} />
            <BaseDescription data={carInfo} />
            <CarImageList data={carImages} />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default PriceModal
