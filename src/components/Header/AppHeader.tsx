import React from 'react';
import { Layout, theme } from 'antd';
import Logo from '../UI/AppBar/Logo';
import UserHeader from './UserHeader/UserHeader';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          padding: '10px 20px',
          background: colorBgContainer,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 10,
          justifyContent: 'space-between',
        }}
      >
        <Logo />
        <UserHeader />
      </Header>
    </>
  );
};

export default AppHeader;
