import React, { useEffect, useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { useBoolean } from 'ahooks';
import { SECRET_KEY, addStorageListener, getLocalSecret, removeLocalSecret } from '../service/storage';
import SecretModal from '../home/secret-modal';
import { getSecret } from '../service/auth';

const AuthLayout = (props) => {

  const [secret, setSecret] = useState(getLocalSecret)
  const [openState, {setFalse, setTrue}] = useBoolean(!secret);

  useEffect(() => {
    if(secret) {
      getSecret({secret_key: secret}).then(() => {}, err => {
        console.log('error', err);
        setTrue();
        setSecret('')
        removeLocalSecret()
      })
    }
    

    return addStorageListener(SECRET_KEY, (val) => {
      console.log('val', val);
      if(val) {
        setSecret(val)
      }else {
        setTrue();
      }
    })
  }, [])

  return (
    secret ? <Outlet /> : <SecretModal open={openState} onCancel={setFalse} onOk={setSecret} />
  );
};
export default AuthLayout;