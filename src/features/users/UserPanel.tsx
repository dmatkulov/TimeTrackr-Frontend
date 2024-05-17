import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AdminMenu from './components/AdminMenu';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import Breadcrumbs from '../../router/Breadcrumbs';

const { Content } = Layout;

interface Props extends React.PropsWithChildren {}
const UserPanel: React.FC<Props> = () => {
  const { md } = useBreakpoint();
  return (
    <>
      <Layout hasSider style={{ minHeight: '100vh' }}>
        <AdminMenu />
        <Layout
          style={{
            marginLeft: !md ? '0' : '20px',
            marginTop: '65px',
            height: '90vh',
            overflow: 'auto',
          }}
        >
          <Content style={{ margin: '0' }}>
            <div
              style={{
                padding: '15px 30px',
              }}
            >
              <Breadcrumbs />
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default UserPanel;
