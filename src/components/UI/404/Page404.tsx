import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const Page404: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Извините, такой страницы не существует"
      extra={
        <Button type="link" onClick={() => navigate(-1)}>
          Назад
        </Button>
      }
    />
  );
};

export default Page404;
