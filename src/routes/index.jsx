import React from "react";
import HomeLayout from "../layout/home-layout";
import HomePage from "../home";
import QuotationPage from '../quotation';
import LoginModal from "../pages/login";
import SecretPage from "../pages/secrets";
import AuthLayout from "../layout/auth-layout";

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