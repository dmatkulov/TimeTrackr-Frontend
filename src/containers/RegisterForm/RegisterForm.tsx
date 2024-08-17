import React, { useState } from 'react';
import { RegisterMutation } from '../../types/types.user';
import { appRoutes } from '../../common/routes';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../store/services/auth/auth';
import { Button, Form, Input } from 'antd';
import PasswordInput from '../../components/FormInputGroups/PasswordInputGroup';

const initialState: RegisterMutation = {
  email: '',
  firstname: '',
  lastname: '',
  password: '',
};

const RegisterForm: React.FC = () => {
  const [signUp, { isLoading }] = useSignUpMutation();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [state, setState] = useState<RegisterMutation>(initialState);

  const handleFormSubmit = async (state: RegisterMutation) => {
    await signUp(state).unwrap();
    navigate(appRoutes.redirect);
  };

  const onFinish = async () => {
    try {
      await handleFormSubmit(state);
    } catch (e) {
      console.log(e);
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Фамилия"
          name="lastname"
          rules={[{ required: true, message: 'Введите фамилию' }]}
        >
          <Input
            placeholder="Фамилия"
            name="lastname"
            size="large"
            value={state.lastname}
            onChange={inputChangeHandler}
          />
        </Form.Item>
        <Form.Item
          label="Имя"
          name="firstname"
          rules={[{ required: true, message: 'Введите имя' }]}
        >
          <Input
            placeholder="Имя"
            name="firstname"
            size="large"
            value={state.firstname}
            onChange={inputChangeHandler}
          />
        </Form.Item>
        <Form.Item
          label="Почта"
          name="email"
          rules={[
            {
              required: true,
              message: 'Введите адрес электронной почты',
            },
            { message: 'Неверный формат электронной почты', type: 'email' },
          ]}
        >
          <Input
            placeholder="Электронная почта"
            name="email"
            size="large"
            value={state.email}
            onChange={inputChangeHandler}
          />
        </Form.Item>
        <PasswordInput state={state} onChange={inputChangeHandler} />
        <Form.Item>
          <Button
            size="large"
            htmlType="submit"
            type="primary"
            style={{ width: '100%', margin: '16px 0' }}
            disabled={isLoading}
          >
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default RegisterForm;
