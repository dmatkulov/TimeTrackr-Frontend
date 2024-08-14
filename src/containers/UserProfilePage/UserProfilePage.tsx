import React from 'react';
import UserProfile from '../../components/UserProfile/UserProfile';
import { useAppSelector } from '../../store/hooks/hooks';
import { selectUser } from '../../store/features/auth/authSlice';

const UserProfilePage: React.FC = () => {
  const user = useAppSelector(selectUser);

  return (
    user && (
      <>
        <UserProfile user={user} />
      </>
    )
  );
};

export default UserProfilePage;
