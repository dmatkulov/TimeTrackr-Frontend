import React from 'react';
import { Dropdown, Flex, MenuProps, Typography } from 'antd';
import { appRoutes } from '../../../services/routes.service';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { logOut } from '../../../store/users/UsersThunks';
import { useNavigate } from 'react-router-dom';
import MobileMenu from '../../UI/AppBar/MobileMenu';
import UserTitle from '../../UI/AppBar/UserTitle';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { selectUser } from '../../../store/users/UsersSlice';

const { Link } = Typography;

const UserHeader: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { md } = useBreakpoint();

  const logOutUser = async () => {
    await dispatch(logOut());
    navigate(appRoutes.auth);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link href={appRoutes.employee.account}>Профиль</Link>,
    },
    {
      key: '2',
      label: <Link href={appRoutes.employee.dashboard}>Мой кабинет</Link>,
    },
    {
      key: '3',
      danger: true,
      label: 'Выйти',
      onClick: logOutUser,
    },
  ];

  return (
    user && (
      <>
        teams projects
        <Flex align="center" justify="space-between" vertical={false}>
          {!md ? (
            <MobileMenu user={user} />
          ) : (
            <Dropdown menu={{ items }} placement="bottomRight" arrow>
              <div>
                <UserTitle user={user} />
              </div>
            </Dropdown>
          )}
        </Flex>
      </>
    )
  );
};

export default UserHeader;
