import { useState, useEffect } from 'react'

import './App.css'
import { Button, Modal } from 'antd'
import LoginModal from './home/login-modal';
import HomePage from './home';
import DealerPrice from './dealer-price'
import HomeLayout from './layout/home-layout';
import { getSession } from './service/storage';
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom';
import QuotationPage from './quotation';
import routes from './routes';


function App() {

  const routesElement = useRoutes(routes);

  return (
    <>
      {routesElement}
    </>
  );
}

function App2() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const session = getSession();
    if(!session) {
      showModal();
    }
  })

  const searchParams = new URLSearchParams(location.search)
  const type = searchParams.get('type')
  console.log('type', type)
  if(type== 'delear') {
    return <DealerPrice />
  }

  return (
    <>
      <HomeLayout>
        <LoginModal open={isModalOpen} onCancel={handleCancel} />
        <HomePage />
      </HomeLayout>
    </>
  )
}

export default App
