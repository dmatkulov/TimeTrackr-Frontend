import React from 'react';
import { Dropdown, Flex, MenuProps, Typography } from 'antd';
import { User } from '../../../types/types.user';
import { appRoutes } from '../../../utils/routes';
import { useAppDispatch } from '../../../app/hooks';
import { logOut } from '../../../features/users/UsersThunks';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../../features/users/admin/components/AdminHeader';
import EmployeeHeader from '../../../features/users/employee/components/EmployeeHeader';
import UserDrawer from './UserDrawer';
import UserAvatar from './UserAvatar';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

const { Link } = Typography;
interface Props {
  user: User;
}
const UserAppBar: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { sm } = useBreakpoint();
  const isAdmin = user.role === 'admin';

  const logOutUser = async () => {
    await dispatch(logOut());
    navigate(appRoutes.login);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link href={isAdmin ? appRoutes.admin.staff : appRoutes.employee.today}>
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

        {!sm ? (
          <UserDrawer user={user} />
        ) : (
          <Dropdown menu={{ items }} placement="bottomRight" arrow>
            <div>
              <UserAvatar user={user} />
            </div>
          </Dropdown>
        )}
      </Flex>
    </>
  );
};

export default UserAppBar;
