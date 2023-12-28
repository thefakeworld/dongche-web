import React, { useEffect, useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { useBoolean } from 'ahooks';
import { SECRET_KEY, addStorageListener, getLocalSecret, removeLocalSecret } from '../service/storage';
import SecretModal from '../home/secret-modal';
import { getSecret } from '../service/auth';

const H5Layout = (props) => {

  return <div className="app-h5" style={{ height: '100%', overflow: 'auto'}}>
    <Outlet />
  </div>;
};
export default H5Layout;