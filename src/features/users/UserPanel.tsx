import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AdminSlider from '../adminPages/components/AdminSlider';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

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
          <Content style={{ margin: '24px 0', overflow: 'initial' }}>
            <div
              style={{
                padding: '30px',
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
