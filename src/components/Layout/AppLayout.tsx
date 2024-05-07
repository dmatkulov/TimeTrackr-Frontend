import React from 'react';
import { Button, Layout } from 'antd';
import AdminMenu from '../UI/Menu/AdminMenu';
import Sider from 'antd/es/layout/Sider';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logOut } from '../../features/users/UsersThunks';

const { Header, Content, Footer } = Layout;

interface Props extends React.PropsWithChildren {}
const AppLayout: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const logOutUser = async () => {
    await dispatch(logOut());
  };

  return (
    <Layout hasSider style={{ minHeight: '100vh' }}>
      <Sider
        width="20%"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          background: '#fff',
        }}
      >
        <div className="demo-logo-vertical">Time Trackr</div>
        <AdminMenu />
        <Button onClick={logOutUser}>Logout</Button>
      </Sider>
      <Layout style={{ marginLeft: '20%' }}>
        <Header style={{ padding: 0 }}>Header</Header>
        <Content style={{ margin: '24px 0', overflow: 'initial' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
