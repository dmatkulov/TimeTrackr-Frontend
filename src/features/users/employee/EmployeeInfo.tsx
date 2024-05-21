import React from 'react';
import UserProfile from '../components/UserProfile';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../UsersSlice';

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
