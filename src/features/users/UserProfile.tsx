import React from 'react';
import { Button, Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logOut } from './UsersThunks';
import AdminMenu from '../../components/UI/Menu/AdminMenu';
import { LogoutOutlined } from '@ant-design/icons';

const { Content } = Layout;

interface Props extends React.PropsWithChildren {}
const AppLayout: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const logOutUser = async () => {
    await dispatch(logOut());
  };

  return (
    <>
      <Layout hasSider style={{ minHeight: '100vh' }}>
        <Sider
          width="280px"
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: '65px',
            bottom: 0,
            padding: '0 16px',
            background: '#fff',
            paddingTop: '40px',
          }}
        >
          <AdminMenu />
          <Button
            style={{ position: 'fixed', bottom: '30px' }}
            icon={<LogoutOutlined />}
            danger
            type="text"
            onClick={logOutUser}
          >
            Выйти
          </Button>
        </Sider>
        <Layout style={{ marginLeft: '304px', paddingTop: '65px' }}>
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
        </Layout>
      </Layout>
    </>
  );
};

export default AppLayout;
