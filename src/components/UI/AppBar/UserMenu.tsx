import React from 'react';
import { Avatar, Dropdown, MenuProps, Space, Typography } from 'antd';
import { User } from '../../../types/types.user';
import { apiURL } from '../../../utils/constants';
import { appRoutes } from '../../../utils/routes';
import { useAppDispatch } from '../../../app/hooks';
import { logOut } from '../../../features/users/UsersThunks';

const { Text, Link } = Typography;
interface Props {
  user: User;
}
const UserMenu: React.FC<Props> = ({ user }) => {
  const src = `${apiURL}/${user.photo}`;
  const dispatch = useAppDispatch();

  const isAdmin = user.role === 'admin';

  const logOutUser = async () => {
    await dispatch(logOut());
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link href={appRoutes.profile}>
          {isAdmin ? 'Панель управления' : 'Мой кабинет'}
        </Link>
      ),
    },
    {
      key: '2',
      danger: true,
      label: 'Выйти',
      onClick: logOutUser,
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight" arrow>
      <Space style={{ alignItems: 'center' }}>
        <Text type="secondary">
          {user.firstname} {user.lastname}
        </Text>
        {user.photo ? (
          <Avatar src={src} alt={user.firstname} />
        ) : (
          <Avatar style={{ backgroundColor: '#f56a00' }}>
            {user.firstname.charAt(0)}
          </Avatar>
        )}
      </Space>
    </Dropdown>
  );
};

export default UserMenu;
