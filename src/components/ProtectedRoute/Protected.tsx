import React from 'react';
import { Navigate } from 'react-router-dom';
import { appRoutes } from '../../services/routes.service';

interface Props extends React.PropsWithChildren {
  isAllowed: boolean | null;
}

const Protected: React.FC<Props> = ({ isAllowed, children }) => {
  if (!isAllowed) {
    return <Navigate to={appRoutes.auth} />;
  }

  return children;
};

export default Protected;
