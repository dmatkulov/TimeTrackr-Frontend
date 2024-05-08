import React from 'react';
import { Button, Layout, theme, Typography } from 'antd';
import { blue } from '@ant-design/colors';
import { appRoutes } from '../../../utils/routes';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../../features/users/UsersSlice';
import { useAppSelector } from '../../../app/hooks';

const { Header } = Layout;
const { Link } = Typography;

const AppBar: React.FC = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const user = useAppSelector(selectUser);

  return (
    <>
      <Header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: colorBgContainer,
          borderBottom: '1px solid #ececec',
        }}
      >
        <Link
          href={appRoutes.home}
          style={{
            color: blue.primary,
            margin: 0,
            fontSize: '20px',
            fontWeight: '600',
          }}
        >
          Time Trackr
        </Link>
        {user ? (
          <Button type="primary" onClick={() => navigate(appRoutes.profile)}>
            Личный кабинет
          </Button>
        ) : (
          <Button type="primary" onClick={() => navigate(appRoutes.login)}>
            Войти
          </Button>
        )}
      </Header>
    </>
  );
};

export default AppBar;
