import React from 'react';
import UserProfile from '../../components/UserProfile/UserProfile';
import { useAppSelector } from '../../store/hooks/hooks';
import { selectUser } from '../../store/users/UsersSlice';

const UserInfoPage: React.FC = () => {
  const user = useAppSelector(selectUser);

  return (
    user && (
      <>
        <UserProfile employee={user} />
      </>
    )
  );
};

export default UserInfoPage;
