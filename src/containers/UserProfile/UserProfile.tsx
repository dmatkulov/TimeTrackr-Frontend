import React from 'react';
import Profile from '../../components/Profile/Profile';
import { useAppSelector } from '../../store/hooks/hooks';
import { selectUser } from '../../store/services/auth/authSlice';

const UserProfile: React.FC = () => {
  const user = useAppSelector(selectUser);

  return (
    user && (
      <>
        <Profile user={user} />
      </>
    )
  );
};

export default UserProfile;
