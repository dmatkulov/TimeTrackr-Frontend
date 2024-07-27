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
        <div
          style={{
            height: '65px',
            width: '100%',
            margin: '10px 0 20px 0',
            position: 'relative',
          }}
        >
          <AppHeader />
        </div>
        <Layout style={{ background: 'white' }}>
          {md && (
            <Sider
              collapsible
              width="250px"
              trigger={null}
              collapsed={collapsed}
              style={{
                paddingTop: '30px',
                paddingLeft: '10px',
                paddingRight: '10px',
                background: '#fff',
                float: 'right',
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
              overflow: 'auto',
              borderRadius: '20px',
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
