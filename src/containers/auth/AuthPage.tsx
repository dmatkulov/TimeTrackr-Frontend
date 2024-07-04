import React, { useState } from 'react';
import { Col, Row, Segmented, Typography } from 'antd';
import Login from '../../features/users/Login';
import { blue } from '@ant-design/colors';
import { authColStyles } from './auth.styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { googleLogin } from '../../features/users/UsersThunks';
import { appRoutes } from '../../utils/routes';
import { GoogleLogin } from '@react-oauth/google';
import { selectLogoutLoading } from '../../features/users/UsersSlice';
import Spinner from '../../components/UI/Spin/Spin';

const { Title } = Typography;
const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutLoading = useAppSelector(selectLogoutLoading);

  const [value, setValue] = useState<string>('Логин');

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate(appRoutes.auth);
  };
  return (
    <>
      {logoutLoading && <Spinner />}
      <Row justify="center" style={{ marginTop: '80px', marginBottom: '40px' }}>
        <Col {...authColStyles.span}>
          <Row justify="center">
            <Title
              level={3}
              style={{
                marginBottom: '30px',
                color: blue.primary,
                textAlign: 'center',
              }}
            >
              Вход
            </Title>
          </Row>
        </Col>
        <Col
          xs={{ span: 24 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Col {...authColStyles.span}>
            <Segmented
              options={['Логин', 'Регистрация']}
              value={value}
              onChange={setValue}
              block
            />
          </Col>
        </Col>
      </Row>
      {value === 'Логин' ? <Login /> : ''}
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={24} style={authColStyles.display}>
          <Col {...authColStyles.span}>
            <div className="divider-wrapper">
              <span className="divider">или</span>
            </div>
          </Col>
        </Col>
        <Col span={24} style={authColStyles.display}>
          <Col {...authColStyles.span} style={authColStyles.display}>
            <GoogleLogin
              size="large"
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  void googleLoginHandler(credentialResponse.credential);
                }
              }}
              onError={() => {
                console.log('Login failed');
              }}
            />
          </Col>
        </Col>
      </Row>
    </>
  );
};

export default AuthPage;
