import React from 'react';
import { PartitionOutlined, TeamOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../../utils/routes';

type MenuItem = Required<MenuProps>['items'][number];

const AdminMenu: React.FC = () => {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      key: '1',
      label: 'Сотрудники',
      icon: <TeamOutlined />,
      onClick: () => navigate(appRoutes.staff),
    },
    {
      key: '2',
      label: 'Позиции',
      icon: <PartitionOutlined />,
      onClick: () => navigate(appRoutes.positions),
    },
  ];

  return (
    <>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['1']}
        mode="inline"
        items={items}
        style={{
          border: 'none',
          paddingRight: '28px',
        }}
      />
    </>
  );
};

export default AdminMenu;
