import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './style.less'

const H5Layout = (props) => {

  return <div className="app-h5">
    <Outlet />
  </div>;
};
export default H5Layout;