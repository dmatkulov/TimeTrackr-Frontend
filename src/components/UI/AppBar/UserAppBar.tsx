import React from 'react';
import { Avatar, Dropdown, Flex, MenuProps, Space, Typography } from 'antd';
import { User } from '../../../types/types.user';
import { apiURL } from '../../../utils/constants';
import { appRoutes } from '../../../utils/routes';
import { useAppDispatch } from '../../../app/hooks';
import { logOut } from '../../../features/users/UsersThunks';
import { useNavigate } from 'react-router-dom';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import AdminHeader from '../../../features/users/admin/components/AdminHeader';
import EmployeeHeader from '../../../features/users/employee/components/EmployeeHeader';

const { Text, Link } = Typography;
interface Props {
  user: User;
}
const UserAppBar: React.FC<Props> = ({ user }) => {
  const src = `${apiURL}/${user.photo}`;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { lg } = useBreakpoint();

  const isAdmin = user.role === 'admin';

  const logOutUser = async () => {
    await dispatch(logOut());
    navigate(appRoutes.login);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link href={appRoutes.admin.staff}>
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
    <>
      <Flex
        align="center"
        justify="space-between"
        vertical={false}
        style={{ flexGrow: 1 }}
      >
        {isAdmin ? <AdminHeader /> : <EmployeeHeader />}

        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <Space style={{ alignItems: 'center' }}>
            <Text style={{ display: lg ? 'block' : 'none' }}>
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
      </Flex>
    </>
  );
};

export default UserAppBar;
