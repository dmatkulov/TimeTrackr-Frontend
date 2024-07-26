import React from 'react';
import { Menu, MenuProps } from 'antd';
import {
  CalendarOutlined,
  LogoutOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAppDispatch } from '../../store/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../store/users/UsersThunks';
import { appRoutes } from '../../services/routes.service';

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
      icon: <TrophyOutlined />,
      onClick: () => handleNavigate(appRoutes.employee.dashboard),
    },
    {
      key: 'teams',
      label: 'Команды',
      icon: <CalendarOutlined />,
      onClick: () => handleNavigate(appRoutes.employee.calendar),
    },
    {
      key: 'projects',
      label: 'Проекты',
      icon: <CalendarOutlined />,
      onClick: () => handleNavigate(appRoutes.employee.calendar),
    },
    {
      key: appRoutes.employee.profileInfo,
      label: 'Профиль',
      icon: <UserOutlined />,
      onClick: () => handleNavigate(appRoutes.employee.profileInfo),
      style: {
        marginTop: 'auto',
      },
    },
    {
      key: 'logout',
      label: 'Выйти',
      icon: <LogoutOutlined />,
      onClick: logOutUser,
      danger: true,
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
