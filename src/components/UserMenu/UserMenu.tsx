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
  useGetTeamsListQuery,
  useToggleFavouriteTeamMutation,
} from '../../store/services/team/team';
import { blue } from '@ant-design/colors';
import { useAppSelector } from '../../store/hooks/hooks';
import { selectUser } from '../../store/services/auth/authSlice';
import { Roles } from '../../enum/roles.enum';
import {
  useGetProjectsListQuery,
  useToggleFavouriteProjectMutation,
} from '../../store/services/projects/projects';
import { MenuListItems } from '../../types/types.global';

type MenuItem = Required<MenuProps>['items'][number];

// interface MenuChildren {
//   key: string;
//   label: React.JSX.Element;
//   icon?: React.JSX.Element;
//   type?: string;
//   onClick?: () => void;
//   style?: CSSProperties;
//   className?: string;
//   disabled?: boolean;
// }

interface Props {
  handleMobile?: () => void;
  collapsed?: boolean;
}

const UserMenu: React.FC<Props> = ({ handleMobile, collapsed }) => {
  const user = useAppSelector(selectUser);

  const isTeamLead = user && user.roles.includes(Roles.TeamLead);

  const { data: teams = [], refetch } = useGetTeamsListQuery();
  const { data: projects = [] } = useGetProjectsListQuery();
  const [toggleTeam] = useToggleFavouriteTeamMutation();
  const [toggleProject] = useToggleFavouriteProjectMutation();
  const [logout] = useLogoutMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const activeKey = location.pathname;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const toggleFavTeam = async (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    try {
      await toggleTeam({ id }).unwrap();
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const toggleFavProject = async (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    try {
      await toggleProject({ id }).unwrap();
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  const createListItems = (
    items: MenuListItems[],
    route: string,
    toggle: (event: React.MouseEvent, id: string) => void,
  ) => {
    return items
      .map((item) => ({
        key: item._id,
        label: (
          <Flex justify="space-between" align="center">
            <Typography.Text
              style={{
                maxWidth: '200px',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {item.name}
            </Typography.Text>
            <Button
              type="text"
              style={{ color: '#969a9e' }}
              onClick={(event: React.MouseEvent) => toggle(event, item._id)}
              icon={
                item.isFavorite ? (
                  <StarFilled style={{ color: '#FABB18' }} />
                ) : (
                  <StarOutlined />
                )
              }
            />
          </Flex>
        ),
        onClick: () => handleNavigate(route + item._id),
        style: { paddingRight: '8px' },
      }))
      .splice(0, 6);
  };

  const getMenuList = (
    items: MenuListItems[],
    route: string,
    toggle: (event: React.MouseEvent, id: string) => void,
    team?: boolean,
  ) => {
    if (items && items.length > 0) {
      const list = items.filter((item) => !item.isFavorite).splice(0, 4);
      return createListItems(list, route, toggle);
    } else if (items.length === 0) {
      return [
        {
          key: team ? 'emptyTeams' : 'emptyProjects',
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
  };

  const getFavList = (
    items: MenuListItems[],
    route: string,
    toggle: (event: React.MouseEvent, id: string) => void,
  ) => {
    const selectedTeamList = items.filter((item) => item.isFavorite);
    return createListItems(selectedTeamList, route, toggle);
  };

  const teamsList =
    getMenuList(teams, appRoutes.user.teams, toggleFavTeam, true) ?? [];
  const favouriteTeamsList =
    getFavList(teams, appRoutes.user.teams, toggleFavTeam) ?? [];

  const projectsList =
    getMenuList(projects, appRoutes.user.projects, toggleFavProject) ?? [];
  const favouriteProjectsList =
    getFavList(projects, appRoutes.user.projects, toggleFavProject) ?? [];

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
    // borderRadius: '16px',
    overflow: 'hidden',
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
          children: favouriteTeamsList,
          style: { display: favouriteTeamsList.length > 0 ? 'block' : 'none' },
        },
        {
          type: 'divider',
          style: { display: favouriteTeamsList.length > 0 ? 'block' : 'none' },
        },
        ...teamsList,
        {
          key: 'allTeams',
          label: (
            <Flex justify="space-between" align="center">
              Все команды
              <RightOutlined />
            </Flex>
          ),
          onClick: () => handleNavigate(appRoutes.user.teams + 'all'),
        },
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
          key: 'g1',
          label: 'Избранное',
          type: 'group',
          children: favouriteProjectsList,
          style: {
            display: favouriteProjectsList.length > 0 ? 'block' : 'none',
          },
        },
        {
          type: 'divider',
          style: {
            display: favouriteProjectsList.length > 0 ? 'block' : 'none',
          },
        },
        ...projectsList,
        {
          key: 'allProjects',
          label: (
            <Flex justify="space-between" align="center">
              Все проекты
              <RightOutlined />
            </Flex>
          ),
          onClick: () => handleNavigate(appRoutes.user.teams + 'all'),
        },
        { type: 'divider', style: { display: !isTeamLead ? 'none' : 'block' } },
        {
          key: 'addProject',
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
