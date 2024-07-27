import React, { useState } from 'react';
import { Menu, MenuProps } from 'antd';
import {
  CalendarFilled,
  CalendarOutlined,
  DashboardFilled,
  DashboardOutlined,
  FileFilled,
  FileOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useAppDispatch } from '../../store/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../store/users/UsersThunks';
import { appRoutes } from '../../services/routes.service';
import './index.css';

type MenuItem = Required<MenuProps>['items'][number];

interface Props {
  handleMobile?: () => void;
}

const UserMenu: React.FC<Props> = ({ handleMobile }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOutUser = async () => {
    await dispatch(logOut());
    navigate(appRoutes.auth);
  };

  const [icon, setIcon] = useState<string>('');

  const handleNavigate = (path: string, key: string) => {
    navigate(path);
    setIcon(key);

    if (handleMobile) {
      handleMobile();
    }
  };

  const activeKey = location.pathname;

  const items: MenuItem[] = [
    {
      key: 'dashboard',
      label: 'Дашбоард',
      icon:
        icon === 'dashboard' ? (
          <DashboardFilled style={{ fontSize: '18px' }} />
        ) : (
          <DashboardOutlined style={{ fontSize: '18px' }} />
        ),
      onClick: () => handleNavigate(appRoutes.employee.dashboard, 'dashboard'),
    },
    {
      key: 'notes',
      label: 'Мои заметки',
      icon:
        icon === 'notes' ? (
          <FileFilled style={{ fontSize: '18px' }} />
        ) : (
          <FileOutlined style={{ fontSize: '18px' }} />
        ),
      onClick: () => handleNavigate(appRoutes.employee.calendar, 'notes'),
    },
    {
      key: 'calendar',
      label: 'Календарь',
      icon:
        icon === 'calendar' ? (
          <CalendarFilled style={{ fontSize: '18px' }} />
        ) : (
          <CalendarOutlined style={{ fontSize: '18px' }} />
        ),
      onClick: () => handleNavigate(appRoutes.employee.calendar, 'calendar'),
      style: {
        marginBottom: '20px',
      },
    },
    {
      type: 'divider',
    },
    {
      key: 'teams',
      label: 'Команды',
      icon: <CalendarOutlined />,
      onClick: () => handleNavigate(appRoutes.employee.calendar, 'teams'),
      style: {
        marginTop: '20px',
      },
    },
    {
      key: 'projects',
      label: 'Проекты',
      icon: <CalendarOutlined />,
      onClick: () => handleNavigate(appRoutes.employee.calendar, 'projects'),
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
  ];

  return (
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
  );
};

export default UserMenu;
