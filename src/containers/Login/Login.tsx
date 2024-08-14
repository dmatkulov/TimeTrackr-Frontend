import React, { useEffect, useRef } from 'react';
import { Button, Form, FormProps, Input, InputRef } from 'antd';
import { LoginMutation } from '../../types/types.user';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../utils/routes.service';
import { useSignInMutation } from '../../store/features/auth/auth';

const App: React.FC = () => {
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();
  const [form] = Form.useForm();

  const onSubmit: FormProps<LoginMutation>['onFinish'] = async (
    loginMutation,
  ) => {
    const data = await signIn(loginMutation);

    if (!(data as { error: object }).error) {
      navigate(appRoutes.redirect);
      form.resetFields();
    }
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
            disabled={false}
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default App;
