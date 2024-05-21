import React from 'react';
import { Menu, MenuProps } from 'antd';
import {
  CalendarOutlined,
  LogoutOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAppDispatch } from '../../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../UsersThunks';
import { appRoutes } from '../../../../utils/routes';

type MenuItem = Required<MenuProps>['items'][number];

const EmployeeMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

export default EmployeeMenu;
