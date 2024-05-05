import React from 'react';
import { Navigate } from 'react-router-dom';
import { appRoutes } from '../../utils/routes';

interface Props extends React.PropsWithChildren {
  isAllowed: boolean | null;
}

const ProtectedRoute: React.FC<Props> = ({ isAllowed, children }) => {
  if (!isAllowed) {
    return <Navigate to={appRoutes.login} />;
  }

  return children;
};

export default ProtectedRoute;
