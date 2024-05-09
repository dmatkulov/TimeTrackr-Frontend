import React from 'react';
import { Button } from 'antd';
import { appRoutes } from '../../../utils/routes';
import { useNavigate } from 'react-router-dom';

const GuestAppBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button type="primary" onClick={() => navigate(appRoutes.login)}>
        Войти
      </Button>
    </>
  );
};

export default GuestAppBar;
