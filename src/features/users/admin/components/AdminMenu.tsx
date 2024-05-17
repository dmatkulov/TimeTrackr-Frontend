import React, { useState } from 'react';
import { Button, Menu, MenuProps, Tooltip } from 'antd';
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PartitionOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import { useAppDispatch } from '../../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../UsersThunks';
import { appRoutes } from '../../../../utils/routes';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

type MenuItem = Required<MenuProps>['items'][number];

const AdminMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);

  const screens = useBreakpoint();
  const xs = screens.xs;

  const logOutUser = async () => {
    await dispatch(logOut());
    navigate(appRoutes.login);
  };

  const activeKey = location.pathname.split('/')[3];

  const items: MenuItem[] = [
    {
      key: 'all-staff',
      label: 'Сотрудники',
      icon: <TeamOutlined />,
      onClick: () => navigate(appRoutes.admin.staff),
    },
    {
      key: 'positions',
      label: 'Позиции',
      icon: <PartitionOutlined />,
      onClick: () => navigate(appRoutes.admin.positions),
    },
    {
      key: 'logout',
      label: 'Выйти',
      icon: <LogoutOutlined />,
      onClick: logOutUser,
      danger: true,
      style: {
        marginTop: 'auto',
      },
    },
    {
      type: 'divider',
      style: {
        marginBottom: '20px',
      },
    },
  ];

  return (
    <Sider
      collapsible
      trigger={null}
      collapsed={collapsed}
      style={{
        display: xs ? 'none' : 'block',
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
        <Menu
          defaultSelectedKeys={[activeKey]}
          mode="inline"
          items={items}
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: 'none',
            flexGrow: 1,
          }}
        />
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
  );
};

export default AdminMenu;
