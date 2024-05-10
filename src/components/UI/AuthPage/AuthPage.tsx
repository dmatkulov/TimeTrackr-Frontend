import React, { useCallback, useEffect } from 'react';
import { Flex, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/UsersSlice';
import { appRoutes } from '../../../utils/routes';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const contentStyle = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
  };

  const content = <div style={contentStyle} />;

  const navigateToPanel = useCallback(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate(appRoutes.staff);
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      void navigateToPanel();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [navigateToPanel]);

  return (
    <Flex
      gap="small"
      vertical
      align="center"
      justify="center"
      style={{ height: '100vh' }}
    >
      <Flex gap="small">
        <Spin tip="Загрузка" size="large">
          {content}
        </Spin>
      </Flex>
    </Flex>
  );
};

export default AuthPage;
