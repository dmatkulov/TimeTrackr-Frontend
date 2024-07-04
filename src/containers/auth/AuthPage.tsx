import React, { useState } from 'react';
import { Divider, Segmented, Space, Typography } from 'antd';
import Login from '../../features/users/Login';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { googleLogin } from '../../features/users/UsersThunks';
import { appRoutes } from '../../utils/routes';
import { GoogleLogin } from '@react-oauth/google';
import { selectLogoutLoading } from '../../features/users/UsersSlice';
import Spinner from '../../components/UI/Spin/Spin';
import { AuthEnum } from '../../enum/auth.enum';
import Register from '../../features/users/Register';

const { Title } = Typography;
const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutLoading = useAppSelector(selectLogoutLoading);

  const [value, setValue] = useState<string>(AuthEnum.Login);

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate(appRoutes.redirect);
  };
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '100px',
          marginBottom: '40px',
        }}
      >
        <div
          style={{
            width: '280px',
            maxWidth: '360px',
          }}
        >
          <Title
            level={3}
            style={{
              marginBottom: '50px',
              textAlign: 'center',
            }}
          >
            {value === AuthEnum.Login
              ? 'С возвращением'
              : 'Создание учетной записи'}
          </Title>
          <div style={{ marginBottom: '50px' }}>
            <Segmented
              options={[AuthEnum.Login, AuthEnum.Register]}
              value={value}
              onChange={setValue}
              block
            />
          </div>

          <div style={{ width: '100%' }}>
            {value === AuthEnum.Login ? <Login /> : <Register />}
          </div>

          <Divider style={{ marginTop: 16 }} />

          <Space
            direction="vertical"
            align="center"
            style={{ width: '100%', margin: '10px 0' }}
          >
            {value === AuthEnum.Login ? (
              <>
                <Typography.Text>У вас нет учетной записи?</Typography.Text>
                <Typography.Link onClick={() => setValue(AuthEnum.Register)}>
                  Зарегистрироваться
                </Typography.Link>
              </>
            ) : (
              <>
                <Typography.Text>
                  У вас уже есть учетная запись?
                </Typography.Text>
                <Typography.Link onClick={() => setValue(AuthEnum.Login)}>
                  Войти
                </Typography.Link>
              </>
            )}
          </Space>

          <div>
            <div className="divider-wrapper">
              <Typography.Text style={{ fontSize: '12px' }} className="divider">
                или
              </Typography.Text>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <GoogleLogin
                width={280}
                theme="filled_black"
                size="large"
                text="signin"
                onSuccess={(credentialResponse) => {
                  if (credentialResponse.credential) {
                    void googleLoginHandler(credentialResponse.credential);
                  }
                }}
                onError={() => {
                  console.log('Login failed');
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {logoutLoading && <Spinner />}
    </>
  );
};

export default AuthPage;
