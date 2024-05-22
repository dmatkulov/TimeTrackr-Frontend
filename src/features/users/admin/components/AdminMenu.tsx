import React from 'react';
import { Menu, MenuProps } from 'antd';
import {
  LogoutOutlined,
  PartitionOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useAppDispatch } from '../../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../UsersThunks';
import { appRoutes } from '../../../../utils/routes';

type MenuItem = Required<MenuProps>['items'][number];

interface Props {
  handleMobile?: () => void;
}
const AdminMenu: React.FC<Props> = ({ handleMobile }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOutUser = async () => {
    await dispatch(logOut());
    navigate(appRoutes.login);
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
      key: appRoutes.admin.staff,
      label: 'Сотрудники',
      icon: <TeamOutlined />,
      onClick: () => handleNavigate(appRoutes.admin.staff),
    },
    {
      key: appRoutes.admin.positions,
      label: 'Позиции',
      icon: <PartitionOutlined />,
      onClick: () => handleNavigate(appRoutes.admin.positions),
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

export default AdminMenu;
