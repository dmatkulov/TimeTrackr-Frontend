import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import UserMenu from '../../components/UserMenu/UserMenu';
import Sider from 'antd/es/layout/Sider';
import AppHeader from '../../components/Header/AppHeader';
import UserHeader from '../../components/Header/UserHeader/UserHeader';

const { Content } = Layout;

interface Props extends React.PropsWithChildren {}

const UserPanel: React.FC<Props> = () => {
  const { md } = useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout style={{ minHeight: '100vh', background: 'white' }}>
        <AppHeader toggleMenu={() => setCollapsed(!collapsed)}>
          <UserHeader />
        </AppHeader>
        <Layout
          style={{
            background: 'white',
            height: 'calc(100vh - 80px)',
            minHeight: 'calc(100vh - 80px)',
          }}
        >
          {md && (
            <Sider
              collapsible
              width="250px"
              trigger={null}
              collapsed={collapsed}
              style={{
                overflowY: 'auto',
                paddingLeft: collapsed ? '15.5px' : '10px',
                paddingRight: collapsed ? '15.5px' : '10px',
                background: '#fff',
                float: 'right',
                borderRight: '1px solid rgba(5, 5, 5, 0.06)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <UserMenu collapsed={collapsed} />
              </div>
            </Sider>
          )}
          <Layout
            style={{
              marginLeft: '0',
              overflow: 'auto',
            }}
          >
            <Content style={{ margin: '0' }}>
              <div
                style={{
                  padding: '30px',
                  height: '100%',
                }}
              >
                <Outlet />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default UserPanel;
