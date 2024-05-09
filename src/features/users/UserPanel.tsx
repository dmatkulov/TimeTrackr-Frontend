import React from 'react';
import { Button, Divider, Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logOut } from './UsersThunks';
import AdminMenu from '../../components/UI/Menu/AdminMenu';
import { LogoutOutlined } from '@ant-design/icons';
import { appRoutes } from '../../utils/routes';

const { Content } = Layout;

interface Props extends React.PropsWithChildren {}
const UserPanel: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOutUser = async () => {
    await dispatch(logOut());
    navigate(appRoutes.login);
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
            right: 0,
            padding: '0 16px',
            background: '#fff',
            paddingTop: '40px',
          }}
        >
          <AdminMenu />
          <div
            style={{
              position: 'absolute',
              bottom: '90px',
              left: 0,
              right: '16px',
              marginLeft: '20px',
            }}
          >
            <Divider />
            <Button
              style={{
                marginInline: '4px',
                textAlign: 'left',
                width: '240px',
              }}
              icon={
                <LogoutOutlined
                  style={{ paddingLeft: '8px', marginRight: '2px' }}
                />
              }
              danger
              type="text"
              onClick={logOutUser}
            >
              Выйти
            </Button>
          </div>
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

export default UserPanel;
