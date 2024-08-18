import React, { CSSProperties, useEffect, useState } from 'react';
import { Button, Flex, Menu, MenuProps, Space, Typography } from 'antd';
import {
  CalendarFilled,
  CalendarOutlined,
  DashboardFilled,
  DashboardOutlined,
  ExclamationCircleOutlined,
  FileFilled,
  FileOutlined,
  GlobalOutlined,
  LogoutOutlined,
  MinusOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  RightOutlined,
  RocketTwoTone,
  StarFilled,
  StarOutlined,
  StarTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { appRoutes } from '../../common/routes';
import './index.css';
import { useLogoutMutation } from '../../store/services/auth/auth';
import TeamAdd from '../Team/TeamAdd';
import { useGetTeamsQuery } from '../../store/services/team/team';
import { TeamList } from '../../types/types.team';
import { blue } from '@ant-design/colors';

type MenuItem = Required<MenuProps>['items'][number];

interface Props {
  handleMobile?: () => void;
  collapsed?: boolean;
}

interface MenuChildren {
  key: string;
  label: React.JSX.Element;
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
  disabled?: boolean;
}

const UserMenu: React.FC<Props> = ({ handleMobile, collapsed }) => {
  const [logout] = useLogoutMutation();
  const { data: teams = [], refetch } = useGetTeamsQuery();

  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  let children: MenuChildren[] = [];

  const toggleSaved = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    refetch();
  }, []);

  if (teams && teams.length > 0) {
    children = teams
      .map((team: TeamList) => ({
        key: team._id,
        label: (
          <Flex justify="space-between" align="center">
            {team.name}
            <Button
              type="text"
              style={{ color: '#969a9e' }}
              onClick={toggleSaved}
              icon={team.isSaved ? <StarFilled /> : <StarOutlined />}
            />
          </Flex>
        ),
        onClick: () => console.log('clicked'),
        style: { paddingRight: '8px' },
      }))
      .splice(0, 6);
    children.push({
      key: 'allTeams',
      label: (
        <Flex justify="space-between" align="center">
          Все команды
          <RightOutlined />
        </Flex>
      ),
      onClick: () => handleNavigate(appRoutes.user.teams),
    });
  } else if (teams.length === 0) {
    children = [
      {
        key: 'emptyTeams',
        label: (
          <Space>
            <ExclamationCircleOutlined />
            <Typography.Text style={{ color: '#969a9e' }}>
              Нет данных
            </Typography.Text>
          </Space>
        ),
        style: { background: 'none', cursor: 'default' },
        className: 'menuItemBtn',
        disabled: true,
      },
    ];
  }

  const logOutUser = async () => {
    await logout();
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
    borderRadius: '12px',
  };

  const items: MenuItem[] = [
    {
      key: appRoutes.user.dashboard,
      label: 'Дашбоард',
      icon:
        activeKey === appRoutes.user.dashboard ? (
          <DashboardFilled style={{ fontSize: '18px' }} />
        ) : (
          <DashboardOutlined style={{ fontSize: '18px' }} />
        ),
      onClick: () => handleNavigate(appRoutes.user.dashboard),
    },
    {
      key: appRoutes.user.notes,
      label: 'Мои заметки',
      icon:
        activeKey === appRoutes.user.notes ? (
          <FileFilled style={{ fontSize: '18px' }} />
        ) : (
          <FileOutlined style={{ fontSize: '18px' }} />
        ),
      onClick: () => handleNavigate(appRoutes.user.notes),
    },
    {
      key: appRoutes.user.calendar,
      label: 'Календарь',
      icon:
        activeKey === appRoutes.user.calendar ? (
          <CalendarFilled style={{ fontSize: '18px' }} />
        ) : (
          <CalendarOutlined style={{ fontSize: '18px' }} />
        ),
      onClick: () => handleNavigate(appRoutes.user.calendar),
    },
    {
      key: appRoutes.user.teams,
      label: 'Команды',
      icon: (
        <RocketTwoTone style={{ fontSize: '18px' }} twoToneColor="#FABB18" />
      ),
      style: {
        ...itemStyle,
        marginTop: '30px',
      },
      children: [
        ...children,
        { type: 'divider' },
        {
          key: 'addTeam',
          label: (
            <Button
              style={{ color: blue.primary, padding: '0' }}
              onClick={() => setIsOpen(true)}
              type="link"
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
      key: appRoutes.user.projects,
      label: 'Проекты',
      icon: <StarTwoTone style={{ fontSize: '18px' }} twoToneColor="#FABB18" />,
      onClick: () => handleNavigate(appRoutes.user.projects),
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
            paddingRight: '8px',
          },
        },
        { key: 'project2', label: 'project2' },
        {
          key: 'allProjects',
          label: 'Все проекты',
          onClick: () => handleNavigate(appRoutes.user.teams),
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
      onClick: () => handleNavigate(appRoutes.user.account),
      style: {
        marginTop: 'auto',
      },
    },
    {
      key: 'home',
      label: 'Посетить сайт',
      icon: <GlobalOutlined />,
      onClick: () => handleNavigate(appRoutes.home),
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
    <>
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
              color: '#3947ce',
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
      <TeamAdd isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default UserMenu;
