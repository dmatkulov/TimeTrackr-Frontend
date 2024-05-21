import React from 'react';
import { Layout } from 'antd';
import AdminMenu from './AdminMenu';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

interface Props extends React.PropsWithChildren {}
const AdminPanel: React.FC<Props> = () => {
  const { md } = useBreakpoint();
  return (
    <>
      <Layout hasSider style={{ minHeight: '100vh' }}>
        <AdminMenu />
        <Layout
          style={{
            marginLeft: !md ? 0 : '20px',
            marginTop: '65px',
            height: '90vh',
            overflow: 'auto',
          }}
        >
          <Content style={{ margin: 0, paddingTop: 20 }}>
            <div
              style={{
                padding: '15px 30px',
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

export default AdminPanel;
