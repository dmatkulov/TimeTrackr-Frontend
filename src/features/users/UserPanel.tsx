import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AdminSlider from './admin/components/AdminSlider';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import Breadcrumbs from '../../router/Breadcrumbs';

const { Content } = Layout;

interface Props extends React.PropsWithChildren {}
const UserPanel: React.FC<Props> = () => {
  const screens = useBreakpoint();
  const xs = !screens.md;
  return (
    <>
      <Layout hasSider style={{ minHeight: '100vh' }}>
        <AdminSlider />
        <Layout
          style={{
            marginLeft: xs ? '0' : '20px',
            marginTop: '65px',
            overflow: 'scroll',
          }}
        >
          <Content style={{ margin: '0', overflow: 'initial' }}>
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
