import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/UsersSlice';
import { appRoutes } from '../../utils/routes';

interface Props extends React.PropsWithChildren {}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const user = useAppSelector(selectUser);
  if (!user) {
    return <Navigate to={appRoutes.login} />;
  }
  return children;
};

export default ProtectedRoute;
