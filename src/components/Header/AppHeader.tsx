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
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '20px 20px',
          height: '80px',
          background: colorBgContainer,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
        }}
      >
        <Logo />
        <UserHeader />
      </Header>
    </>
  );
};

export default AppHeader;
