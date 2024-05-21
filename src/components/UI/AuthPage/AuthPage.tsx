import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/UsersSlice';
import { appRoutes } from '../../../utils/routes';
import Spinner from '../Spin/Spin';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const [loading, setLoading] = useState(true);

  const navigateToPanel = useCallback(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate(appRoutes.admin.staffInfo);
      } else {
        navigate(appRoutes.employee.profileInfo);
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      void navigateToPanel();
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [navigateToPanel]);

  return loading && <Spinner />;
};

export default AuthPage;
