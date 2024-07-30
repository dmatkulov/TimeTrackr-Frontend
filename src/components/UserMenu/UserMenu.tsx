import React from 'react';
import { Menu, MenuProps } from 'antd';
import {
  CalendarFilled,
  CalendarOutlined,
  DashboardFilled,
  DashboardOutlined,
  FileFilled,
  FileOutlined,
  LogoutOutlined,
  RocketTwoTone,
  StarTwoTone,
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

  const handleNavigate = (path: string) => {
    navigate(path);

    if (handleMobile) {
      handleMobile();
    }
  };

  const activeKey = location.pathname;

  const items: MenuItem[] = [
    {
      key: appRoutes.employee.dashboard,
      label: 'Дашбоард',
      icon:
        activeKey === appRoutes.employee.dashboard ? (
          <DashboardFilled style={{ fontSize: '18px' }} />
        ) : (
          <DashboardOutlined style={{ fontSize: '18px' }} />
        ),
      onClick: () => handleNavigate(appRoutes.employee.dashboard),
    },
    {
      key: appRoutes.employee.notes,
      label: 'Мои заметки',
      icon:
        activeKey === appRoutes.employee.notes ? (
          <FileFilled style={{ fontSize: '18px' }} />
        ) : (
          <FileOutlined style={{ fontSize: '18px' }} />
        ),
      onClick: () => handleNavigate(appRoutes.employee.notes),
    },
    {
      key: appRoutes.employee.calendar,
      label: 'Календарь',
      icon:
        activeKey === appRoutes.employee.calendar ? (
          <CalendarFilled style={{ fontSize: '18px' }} />
        ) : (
          <CalendarOutlined style={{ fontSize: '18px' }} />
        ),
      onClick: () => handleNavigate(appRoutes.employee.calendar),
      style: {
        marginBottom: '20px',
      },
    },
    {
      type: 'divider',
    },
    {
      key: appRoutes.employee.teams,
      label: 'Команды',
      icon: <RocketTwoTone style={{ fontSize: '18px' }} />,
      onClick: () => handleNavigate(appRoutes.employee.teams),
      style: {
        marginTop: '20px',
      },
    },
    {
      key: appRoutes.employee.projects,
      label: 'Проекты',
      icon: <StarTwoTone style={{ fontSize: '18px' }} />,
      onClick: () => handleNavigate(appRoutes.employee.projects),
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
