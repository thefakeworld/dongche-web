import React from "react";
import HomeLayout from "../layout/home-layout";
import HomePage from "../home";
import QuotationPage from '../quotation';
import LoginModal from "../pages/login";
import SecretPage from "../pages/secrets";
import AuthLayout from "../layout/auth-layout";
import BrandsIndex from "../pages/dealer-price/brands";
import H5Layout from "../layout/h5-layout";
import SeriesIndex from "../pages/dealer-price/series";
import CarsIndex from "../pages/dealer-price/cars";

const routes = [
  {
    path: '/login',
    element: <LoginModal open={true} />,
  },
  {
    path: '/pc',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginModal open={true} />,
      },
      {
        path: 'secrets',
        element: <SecretPage />,
      },
    ]
  },
  /**
   * 移动端布局
   */
  {
    path: '/h5',
    element: <H5Layout />,
    children: [
      {
        path: 'brands',
        element: <BrandsIndex />,
      },
      {
        path: 'series/:id',
        element: <SeriesIndex />,
      },
      {
        path: 'cars/:id',
        element: <CarsIndex />,
      }
    ]
  },
  {
    path: '/quotation',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <QuotationPage />,
      }
    ]
  }
]

export default routes