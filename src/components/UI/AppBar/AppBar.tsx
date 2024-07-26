import React from 'react';
import { Layout, theme } from 'antd';
import { selectUser } from '../../../store/users/UsersSlice';
import { useAppSelector } from '../../../store/hooks/hooks';
import UserAppBar from './UserAppBar';
import Logo from './Logo';

const { Header } = Layout;

const AppBar: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const user = useAppSelector(selectUser);

  return (
    <>
      <Header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          padding: '0 20px',
          background: colorBgContainer,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 10,
          justifyContent: 'space-between',
        }}
      >
        <Logo />
        {user && <UserAppBar user={user} />}
      </Header>
    </>
  );
};

export default AppBar;
