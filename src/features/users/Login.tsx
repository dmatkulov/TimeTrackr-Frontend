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
      <Row style={{ marginTop: '140px' }}>
        <Col span={8} offset={8}>
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
          <Form
            form={form}
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onSubmit}
          >
            <Form.Item<LoginMutation>
              name="email"
              label="Почта"
              rules={[
                {
                  required: true,
                  message: 'Введите адрес электронной почты',
                },
                { message: 'Неверный формат электронной почты', type: 'email' },
              ]}
              style={{ marginBottom: '16px' }}
            >
              <Input />
            </Form.Item>

            <Form.Item<LoginMutation>
              label="Пароль"
              name="password"
              rules={[{ required: true, message: 'Введите пароль' }]}
              style={{ marginBottom: '24px' }}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                disabled={loginLoading}
              >
                Войти
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default App;
