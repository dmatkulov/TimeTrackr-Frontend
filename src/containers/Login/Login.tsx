import React, { useEffect, useRef } from 'react';
import { Button, Form, FormProps, Input, InputRef } from 'antd';
import { LoginMutation } from '../../types/types.user';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../services/routes.service';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { login } from '../../store/users/UsersThunks';
import {
  selectLoginError,
  selectLoginLoading,
} from '../../store/users/UsersSlice';

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

    navigate(appRoutes.redirect);
    form.resetFields();
  };

  const emailInput = useRef<InputRef>(null);
  useEffect(() => {
    if (emailInput.current) {
      emailInput.current.focus();
    }
  }, [emailInput]);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
      >
        <Form.Item<LoginMutation>
          name="email"
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
          style={{ marginBottom: '16px', width: '100%' }}
        >
          <Input
            ref={emailInput}
            autoComplete="current-email"
            size="large"
            placeholder="Адрес электронной почты"
          />
        </Form.Item>

        <Form.Item<LoginMutation>
          name="password"
          rules={[{ required: true, message: 'Введите пароль' }]}
          style={{ marginBottom: '24px' }}
        >
          <Input.Password
            autoComplete="current-password"
            size="large"
            placeholder="Пароль"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: '100%', marginBottom: '16px' }}
            disabled={loginLoading}
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default App;
