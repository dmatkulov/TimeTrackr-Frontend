import React from 'react';
import { Button, Flex, Space, Typography } from 'antd';
import { blue } from '@ant-design/colors';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../utils/routes';
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../features/users/UsersSlice';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const titleStyle = {
    marginTop: 0,
    color: blue.primary,
    marginBottom: '30px',
  };

  return (
    <>
      <Flex vertical align="center" justify="center">
        <Paragraph style={{ marginTop: '120px' }}>Добро пожаловать в</Paragraph>
        <Title style={titleStyle} level={1}>
          Time Trackr
        </Title>
        {!user && (
          <Space direction="vertical" align="center">
            <Paragraph>
              Войдите, чтобы начать пользоваться приложением
            </Paragraph>
            <Button type="primary" onClick={() => navigate(appRoutes.login)}>
              Войти
            </Button>
          </Space>
        )}
      </Flex>
    </>
  );
};

export default Home;
