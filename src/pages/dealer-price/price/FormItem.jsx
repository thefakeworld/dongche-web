import { PayCircleOutlined, DollarOutlined, PercentageOutlined } from '@ant-design/icons';
const unitColorMap = {
  '￥': 'red',
  '$': 'green',
  '%': 'blue',
}

const PriceRMB = () => {
  return <div className="price-rmb"><PayCircleOutlined /></div>
}

const PriceUSD = () => {
  return <div className="price-usd"><DollarOutlined /></div>
}

const Percent = () => {
  return <div className="price-percent"><PercentageOutlined /></div>
}

const componentMap = {
  '￥': PayCircleOutlined,
  '$': DollarOutlined,
  '%': PercentageOutlined,
}

export default function FormItem({ label, unit, extra, children }){

  const unitColor = unitColorMap[extra]

  const Extra = componentMap[extra]

  return <div className="formItem">
    <div className="main">
      <div className="top-label">
        <div className="title">{label}</div>
        <div className={`unit ${unitColor}`} >{unit}</div>
      </div>
      <div className="form-item">
        {children}
      </div>
    </div>
    <div className="extra"><Extra className={`unit ${unitColor}`} /></div>
  </div>
}