import React, { useState } from 'react';
import { Divider, Segmented, Space, Typography } from 'antd';
import Login from '../LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../common/routes';
import { GoogleLogin } from '@react-oauth/google';
import { AuthEnum } from '../../enum/auth.enum';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useGoogleLoginMutation } from '../../store/services/auth/auth';

const { Title } = Typography;
const Auth: React.FC = () => {
  const [googleLogin] = useGoogleLoginMutation();
  const navigate = useNavigate();

  const [value, setValue] = useState<string>(AuthEnum.Login);

  const googleLoginHandler = async (credential: string) => {
    await googleLogin(credential).unwrap();
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
            {value === AuthEnum.Login ? <Login /> : <RegisterForm />}
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
                  console.log('LoginForm failed');
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/*{logoutLoading && <Spinner />}*/}
    </>
  );
};

export default Auth;
