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
import TeamAdd from '../Team/TeamForm/TeamAdd';
import {
  useGetTeamsQuery,
  useToggleFavouriteMutation,
} from '../../store/services/team/team';
import { Team } from '../../types/types.team';
import { blue } from '@ant-design/colors';
import { useAppSelector } from '../../store/hooks/hooks';
import { selectUser } from '../../store/services/auth/authSlice';
import { Roles } from '../../enum/roles.enum';

type MenuItem = Required<MenuProps>['items'][number];

interface MenuChildren {
  key: string;
  label: React.JSX.Element;
  icon?: React.JSX.Element;
  type?: string;
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
  disabled?: boolean;
}

interface Props {
  handleMobile?: () => void;
  collapsed?: boolean;
}

const UserMenu: React.FC<Props> = ({ handleMobile, collapsed }) => {
  const user = useAppSelector(selectUser);

  const isTeamLead = user && user.roles.includes(Roles.TeamLead);

  const { data: teams = [], refetch } = useGetTeamsQuery();
  const [toggle] = useToggleFavouriteMutation();
  const [logout] = useLogoutMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const activeKey = location.pathname;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  let children: MenuChildren[] = [];
  let favouriteTeams: MenuChildren[] = [];

  const toggleFav = async (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    try {
      await toggle({ id }).unwrap();
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  const createTeamItem = (teams: Team[]) => {
    return teams
      .map((team: Team) => ({
        key: team._id,
        label: (
          <Flex justify="space-between" align="center">
            <Typography.Text
              style={{
                maxWidth: '100px',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {team.name}
            </Typography.Text>
            <Button
              type="text"
              style={{ color: '#969a9e' }}
              onClick={(event: React.MouseEvent) => toggleFav(event, team._id)}
              icon={
                team.isFavorite ? (
                  <StarFilled style={{ color: '#FABB18' }} />
                ) : (
                  <StarOutlined />
                )
              }
            />
          </Flex>
        ),
        onClick: () => handleNavigate(appRoutes.user.teamsAll + '/' + team._id),
        style: { paddingRight: '8px' },
      }))
      .splice(0, 6);
  };

  if (teams && teams.length > 0) {
    const teamList = teams.filter((team) => !team.isFavorite);
    const selectedTeamList = teams.filter((team) => team.isFavorite);
    children = createTeamItem(teamList);

    children.push({
      key: 'allTeams',
      label: (
        <Flex justify="space-between" align="center">
          Все команды
          <RightOutlined />
        </Flex>
      ),
      onClick: () => handleNavigate(appRoutes.user.teamsAll),
    });

    favouriteTeams = createTeamItem(selectedTeamList);
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

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  const itemStyle: CSSProperties = {
    display: collapsed ? 'flex' : 'list-item',
    width: collapsed ? '50px' : 'auto',
    border: '1px solid rgba(5, 5, 5, 0.06)',
    borderRadius: '16px',
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
        {
          key: 'g1',
          label: 'Избранное',
          type: 'group',
          children: favouriteTeams,
          style: { display: favouriteTeams.length > 0 ? 'block' : 'none' },
        },
        {
          type: 'divider',
          style: { display: favouriteTeams.length > 0 ? 'block' : 'none' },
        },
        ...children,
        { type: 'divider', style: { display: !isTeamLead ? 'none' : 'block' } },
        {
          key: 'addTeam',
          label: (
            <Button
              style={{ color: blue.primary, padding: '0' }}
              onClick={() => {
                setIsOpen(true);
                if (handleMobile) {
                  handleMobile();
                }
              }}
              type="link"
              icon={<PlusCircleOutlined />}
            >
              Добавить
            </Button>
          ),
          style: {
            display: !isTeamLead ? 'none' : 'block',
            background: 'none',
            cursor: 'default',
          },
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
