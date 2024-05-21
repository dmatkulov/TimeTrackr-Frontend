import React, { useState } from 'react';
import { Button, Menu, MenuProps, Tooltip } from 'antd';
import {
  CalendarOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import { useAppDispatch } from '../../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../UsersThunks';
import { appRoutes } from '../../../../utils/routes';

type MenuItem = Required<MenuProps>['items'][number];

const EmployeeMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);

  const logOutUser = async () => {
    await dispatch(logOut());
    navigate(appRoutes.login);
  };

  const activeKey = location.pathname;

  const items: MenuItem[] = [
    {
      key: appRoutes.employee.today,
      label: 'Сегодня',
      icon: <TrophyOutlined />,
      onClick: () => navigate(appRoutes.employee.today),
    },
    {
      key: appRoutes.employee.calendar,
      label: 'Календарь',
      icon: <CalendarOutlined />,
      onClick: () => navigate(appRoutes.employee.calendar),
    },
    {
      key: appRoutes.employee.profileInfo,
      label: 'Мой профиль',
      icon: <UserOutlined />,
      onClick: () => navigate(appRoutes.employee.profileInfo),
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

export default EmployeeMenu;
