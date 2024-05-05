import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../../utils/routes';

const Page404: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Извините, такой страницы не существует"
      extra={
        <Button type="link" onClick={() => navigate(appRoutes.home)}>
          На главную
        </Button>
      }
    />
  );
};

export default Page404;
