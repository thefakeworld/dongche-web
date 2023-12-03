import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
