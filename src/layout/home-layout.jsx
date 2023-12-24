import React, { useEffect } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { useBoolean } from 'ahooks';
import { SESSION_STORAGE_KEY, addStorageListener, getSession } from '../service/storage';
import LoginModal from '../home/login-modal';

const { Header, Content, Footer, Sider } = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});
const HomeLayout = (props) => {
  const {children} = props;

  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const [openState, {setFalse, setTrue}] = useBoolean();

  useEffect(() => {
    
    const session = getSession();
    if(!session) {
      setTrue();
    }

    return addStorageListener(SESSION_STORAGE_KEY, (val) => {
      console.log('监听 session');
      if(!val) {
        setTrue();
      }
    })
  }, [])

  return (
    <Layout style={{height: '100%'}}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="header-logo" style={{color: 'white'}}>阿瑞斯</div>
      </Header>
      <Content
        style={{
          padding: '0 50px',
          height: '100%',
          overflow: 'auto',
        }}
      >
        <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
          }}
        >
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            {openState ? <LoginModal open={openState} onCancel={setFalse} /> : <Outlet />}
          </Content>
        </Layout>
      </Content>
      {/* <Footer
        style={{
          textAlign: 'center',
        }}
      >
        ©2023 阿瑞斯
      </Footer> */}
    </Layout>
  );
};
export default HomeLayout;