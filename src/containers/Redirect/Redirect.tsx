import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../routes.service';
import Spinner from '../../components/UI/Spin/Spin';
import { Roles } from '../../enum/roles.enum';
import { useAppSelector } from '../../store/hooks/hooks';
import { selectUser } from '../../store/features/auth/authSlice';

const Redirect: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  console.log('user in redirect', user);

  const [loading, setLoading] = useState(true);

  const navigateToPanel = useCallback(() => {
    if (user) {
      if (user.role === Roles.Admin) {
        navigate(appRoutes.admin.staff);
      } else if (user.role === Roles.User) {
        navigate(appRoutes.user.dashboard);
      }
    } else {
      navigate(appRoutes.notFound);
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

export default Redirect;
