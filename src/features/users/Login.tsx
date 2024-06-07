import React from 'react';
import type { FormProps } from 'antd';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { LoginMutation } from '../../types/types.user';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../utils/routes';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { login } from './UsersThunks';
import {
  selectLoginError,
  selectLoginLoading,
  selectLogoutLoading,
} from './UsersSlice';
import { blue } from '@ant-design/colors';
import Spinner from '../../components/UI/Spin/Spin';

const { Title, Paragraph } = Typography;

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginError = useAppSelector(selectLoginError);
  const loginLoading = useAppSelector(selectLoginLoading);
  const logoutLoading = useAppSelector(selectLogoutLoading);

  const [form] = Form.useForm();

  const onSubmit: FormProps<LoginMutation>['onFinish'] = async (
    loginMutation,
  ) => {
    await dispatch(login(loginMutation)).unwrap();

    if (loginError) {
      return;
    }

    navigate(appRoutes.auth);
    form.resetFields();
  };

  return (
    <>
      {logoutLoading && <Spinner />}
      <Row justify="center" style={{ marginTop: '80px' }}>
        <Col xs={{ span: 18 }} sm={{ span: 8 }}>
          <Title
            level={3}
            style={{
              color: blue.primary,
              textAlign: 'center',
            }}
          >
            Вход
          </Title>
          <Paragraph
            style={{
              color: blue.primary,
              textAlign: 'center',
              marginBottom: '50px',
            }}
          >
            Введите адрес электронной почты и пароль
          </Paragraph>
        </Col>
      </Row>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
      >
        <Row justify="center">
          <Col xs={{ span: 18 }} sm={{ span: 14 }} md={{ span: 6 }}>
            <Form.Item<LoginMutation>
              name="email"
              label="Почта"
              rules={[
                {
                  required: true,
                  message: 'Введите адрес электронной почты',
                },
                {
                  message: 'Неверный формат электронной почты',
                  type: 'email',
                },
              ]}
              style={{ marginBottom: '16px' }}
            >
              <Input autoComplete="current-email" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={{ span: 18 }} sm={{ span: 14 }} md={{ span: 6 }}>
            <Form.Item<LoginMutation>
              label="Пароль"
              name="password"
              rules={[{ required: true, message: 'Введите пароль' }]}
              style={{ marginBottom: '24px' }}
            >
              <Input.Password autoComplete="current-password" />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center">
          <Col xs={{ span: 18 }} sm={{ span: 14 }} md={{ span: 6 }}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                disabled={loginLoading}
              >
                Войти
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default App;
