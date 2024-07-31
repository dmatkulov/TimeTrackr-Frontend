import React from 'react';
import { Button, Flex, Menu, MenuProps } from 'antd';
import {
  CalendarFilled,
  CalendarOutlined,
  DashboardFilled,
  DashboardOutlined,
  FileFilled,
  FileOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  RocketTwoTone,
  StarFilled,
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
    },
    {
      key: appRoutes.employee.teams,
      label: 'Команды',
      icon: (
        <RocketTwoTone style={{ fontSize: '18px' }} twoToneColor="#3947ce" />
      ),
      children: [
        {
          key: '7',
          label: (
            <Flex justify="space-between" align="center">
              team1 <Button type="text" icon={<StarFilled />} />
            </Flex>
          ),
          style: {
            paddingRight: '5px',
          },
        },
        { key: '8', label: 'team2' },
        {
          key: 'all',
          label: 'Все команды',
          onClick: () => handleNavigate(appRoutes.employee.teams),
        },
        {
          key: 'add',
          label: (
            <Button
              onClick={() => alert('clicked')}
              type="primary"
              icon={<PlusCircleOutlined />}
            >
              Добавить
            </Button>
          ),
          style: { background: 'none', cursor: 'default' },
          className: 'menuItemBtn',
        },
      ],
      style: {
        marginTop: '20px',
        border: '1px solid rgba(5, 5, 5, 0.06)',
      },
    },
    {
      key: appRoutes.employee.projects,
      label: 'Проекты',
      icon: <StarTwoTone style={{ fontSize: '18px' }} twoToneColor="#3947ce" />,
      onClick: () => handleNavigate(appRoutes.employee.projects),
      children: [
        { key: '5', label: 'Option 5' },
        { key: '6', label: 'Option 6' },
      ],
    },
    {
      type: 'divider',
      style: {
        marginTop: 'auto',
        marginBottom: '10px',
      },
    },

    {
      key: 'profile',
      label: 'Профиль',
      icon: <LogoutOutlined />,
      onClick: () => handleNavigate(appRoutes.employee.account),
    },
    {
      type: 'divider',
      style: {
        marginTop: '10px',
        marginBottom: '30px',
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
