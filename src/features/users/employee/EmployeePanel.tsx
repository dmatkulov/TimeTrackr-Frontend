import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import EmployeeMenu from './components/EmployeeMenu';

const { Content } = Layout;

interface Props extends React.PropsWithChildren {}
const EmployeePanel: React.FC<Props> = () => {
  const { md } = useBreakpoint();
  return (
    <>
      <Layout hasSider style={{ minHeight: '100vh' }}>
        <EmployeeMenu />
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
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default EmployeePanel;
