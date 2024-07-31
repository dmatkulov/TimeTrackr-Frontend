import React, { useState } from 'react';
import { Button, Layout, Tooltip } from 'antd';
import { Outlet } from 'react-router-dom';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import UserMenu from '../../components/UserMenu/UserMenu';
import Sider from 'antd/es/layout/Sider';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import AppHeader from '../../components/Header/AppHeader';

const { Content } = Layout;

interface Props extends React.PropsWithChildren {}

const UserPanel: React.FC<Props> = () => {
  const { md } = useBreakpoint();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      <Layout style={{ minHeight: '100vh', background: 'white' }}>
        <AppHeader />
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
                paddingTop: '30px',
                paddingLeft: '10px',
                paddingRight: '10px',
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
                  paddingBottom: '20px',
                }}
              >
                <UserMenu />
                <Tooltip placement="right" title={collapsed && 'Показать меню'}>
                  <Button
                    type="text"
                    color="#eee"
                    icon={
                      collapsed ? (
                        <MenuUnfoldOutlined />
                      ) : (
                        <MenuFoldOutlined style={{ display: 'inline' }} />
                      )
                    }
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                      textAlign: 'left',
                      padding: '0 24px',
                      marginInline: '4px',
                      height: '40px',
                      marginBottom: '20px',
                    }}
                  >
                    {!collapsed && 'Скрыть меню'}
                  </Button>
                </Tooltip>
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
