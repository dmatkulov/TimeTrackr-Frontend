import React, { useState } from 'react';
import { Button, Layout, Tooltip } from 'antd';
import { Outlet } from 'react-router-dom';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import EmployeeMenu from './employee/components/EmployeeMenu';
import Sider from 'antd/es/layout/Sider';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from './UsersSlice';
import AdminMenu from './admin/components/AdminMenu';

const { Content } = Layout;

interface Props extends React.PropsWithChildren {}
const UserPanel: React.FC<Props> = () => {
  const user = useAppSelector(selectUser);
  const { md } = useBreakpoint();
  const [collapsed, setCollapsed] = useState(true);

  const isAdmin = user?.role === 'admin';

  return (
    <>
      <Layout hasSider style={{ minHeight: '100vh' }}>
        {md && (
          <Sider
            collapsible
            breakpoint="sm"
            width="250px"
            trigger={null}
            collapsed={collapsed}
            style={{
              marginTop: '65px',
              paddingTop: '40px',
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
              {isAdmin ? <AdminMenu /> : <EmployeeMenu />}
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

export default UserPanel;
