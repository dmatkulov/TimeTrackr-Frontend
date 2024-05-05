import React from 'react';
import { Button, Flex, Space, Typography } from 'antd';
import { blue } from '@ant-design/colors';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../utils/routes';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const titleStyle = {
    marginTop: 0,
    color: blue.primary,
    marginBottom: '30px',
  };

  return (
    <>
      <Flex
        vertical
        align="center"
        style={{ height: '100vh' }}
        justify="center"
      >
        <Paragraph>Добро пожаловать в</Paragraph>
        <Title style={titleStyle} level={1}>
          Time Trackr
        </Title>
        <Space direction="vertical" align="center">
          <Paragraph>Войдите, чтобы начать пользоваться приложением</Paragraph>
          <Button type="primary" onClick={() => navigate(appRoutes.login)}>
            Войти
          </Button>
        </Space>
      </Flex>
    </>
  );
};

export default Home;
