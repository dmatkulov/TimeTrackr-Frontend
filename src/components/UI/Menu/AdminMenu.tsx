import React, { useEffect } from 'react';
import { TeamOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../../utils/routes';
import { useAppDispatch } from '../../../app/hooks';

type MenuItem = Required<MenuProps>['items'][number];

const AdminMenu: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getAllStaff();
  }, [dispatch]);

  const getAllStaff = () => {
    navigate(appRoutes.staff);
  };

  const items: MenuItem[] = [
    {
      key: '1',
      label: 'Сотрудники',
      icon: <TeamOutlined />,
      onClick: getAllStaff,
    },
    {
      type: 'divider',
    },
  ];
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['1']}
        mode="inline"
        items={items}
      />
    </>
  );
};

export default AdminMenu;
