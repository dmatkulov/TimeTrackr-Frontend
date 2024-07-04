import React from 'react';
import { Button, Col, Form, FormProps, Input, Row } from 'antd';
import { LoginMutation } from '../../types/types.user';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../utils/routes';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { login } from './UsersThunks';
import { selectLoginError, selectLoginLoading } from './UsersSlice';
import { authColStyles } from '../../containers/auth/auth.styles';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginError = useAppSelector(selectLoginError);
  const loginLoading = useAppSelector(selectLoginLoading);

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
      <Form
        form={form}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
      >
        <Row justify="center">
          <Col {...authColStyles.span}>
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
          <Col {...authColStyles.span}>
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
          <Col {...authColStyles.span}>
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
