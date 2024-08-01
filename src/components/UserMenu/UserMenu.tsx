import React, { CSSProperties, useState } from 'react';
import { Button, Flex, Menu, MenuProps } from 'antd';
import {
  CalendarFilled,
  CalendarOutlined,
  DashboardFilled,
  DashboardOutlined,
  FileFilled,
  FileOutlined,
  LogoutOutlined,
  MinusOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  RocketTwoTone,
  StarFilled,
  StarTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import { useAppDispatch } from '../../store/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../store/users/UsersThunks';
import { appRoutes } from '../../services/routes.service';
import './index.css';

type MenuItem = Required<MenuProps>['items'][number];

interface Props {
  handleMobile?: () => void;
  collapsed?: boolean;
}

const UserMenu: React.FC<Props> = ({ handleMobile, collapsed }) => {
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

  const itemStyle: CSSProperties = {
    display: collapsed ? 'flex' : 'list-item',
    width: collapsed ? '50px' : 'auto',
    border: '1px solid rgba(5, 5, 5, 0.06)',
  };

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
      style: {
        ...itemStyle,
        marginTop: '30px',
      },
      children: [
        {
          key: 'team1',
          label: (
            <Flex justify="space-between" align="center">
              team1 <Button type="text" icon={<StarFilled />} />
            </Flex>
          ),
          style: {
            paddingRight: '5px',
          },
        },
        { key: 'team2', label: 'team2' },
        {
          key: 'allTeams',
          label: 'Все команды',
          onClick: () => handleNavigate(appRoutes.employee.teams),
        },
        {
          key: 'addTeam',
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
    },
    {
      key: appRoutes.employee.projects,
      label: 'Проекты',
      icon: <StarTwoTone style={{ fontSize: '18px' }} twoToneColor="#3947ce" />,
      onClick: () => handleNavigate(appRoutes.employee.projects),
      style: {
        ...itemStyle,
        marginTop: '10px',
      },
      children: [
        {
          key: 'project1',
          label: (
            <Flex justify="space-between" align="center">
              project1 <Button type="text" icon={<StarFilled />} />
            </Flex>
          ),
          style: {
            paddingRight: '5px',
          },
        },
        { key: 'project2', label: 'project2' },
        {
          key: 'allProjects',
          label: 'Все проекты',
          onClick: () => handleNavigate(appRoutes.employee.teams),
        },
        {
          key: 'addProject',
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
    },
    {
      key: 'profile',
      label: 'Профиль',
      icon: <UserOutlined />,
      onClick: () => handleNavigate(appRoutes.employee.account),
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

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  return (
    <Menu
      defaultSelectedKeys={[activeKey]}
      mode="inline"
      openKeys={openKeys}
      onOpenChange={handleOpenChange}
      items={items}
      expandIcon={({ isOpen }) => (
        <Flex
          align="center"
          justify="center"
          style={{
            width: '28px',
            height: '28px',
            background: '#FFF8E8',
            borderRadius: '8px',
            marginLeft: 'auto',
          }}
        >
          {isOpen ? <MinusOutlined /> : <PlusOutlined />}
        </Flex>
      )}
      style={{
        height: '100%',
        display: 'flex',
        paddingTop: '30px',
        paddingBottom: '30px',
        flexDirection: 'column',
        border: 'none',
        flexGrow: 1,
      }}
    />
  );
};

export default UserMenu;
