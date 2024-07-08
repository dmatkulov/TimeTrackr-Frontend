import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks/hooks';
import { selectUser } from '../../store/users/UsersSlice';
import { appRoutes } from '../../services/routes.service';
import Spinner from '../../components/UI/Spin/Spin';

const Redirect: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const [loading, setLoading] = useState(true);

  const navigateToPanel = useCallback(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate(appRoutes.admin.staff);
      } else if (user.role === 'employee') {
        navigate(appRoutes.employee.dashboard);
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
