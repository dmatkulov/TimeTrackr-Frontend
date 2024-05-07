import React, { useRef } from 'react';
import { TeamOutlined } from '@ant-design/icons';
import type { MenuProps, MenuRef } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../../utils/routes';

type MenuItem = Required<MenuProps>['items'][number];

const AdminMenu: React.FC = () => {
  const navigate = useNavigate();

  const getAllStaff = () => {
    navigate(appRoutes.staff);
  };

  const items: MenuItem[] = [
    {
      key: '1',
      label: 'Сотрудники',
      icon: <TeamOutlined />,
      children: [
        { key: '2', label: 'Все сотрудники', onClick: getAllStaff },
        {
          key: '3',
          label: 'По отделам',
          children: [
            { key: '7', label: 'Option 7' },
            { key: '8', label: 'Option 8' },
          ],
        },
      ],
    },
    {
      type: 'divider',
    },
  ];
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  const menuRef = useRef<MenuRef>(null);

  return (
    <>
      <Menu
        ref={menuRef}
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
