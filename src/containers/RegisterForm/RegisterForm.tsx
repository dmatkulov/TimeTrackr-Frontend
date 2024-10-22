import React, { useEffect, useState } from 'react';
import { RegisterMutation } from '../../types/types.user';
import { appRoutes } from '../../common/routes';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../store/services/auth/auth';
import { Button, Form, Input, message } from 'antd';
import PasswordInput from '../../components/FormInputGroups/PasswordInputGroup';
import { handleFormFieldError } from '../../utils/handleError';

const initialState: RegisterMutation = {
  email: '',
  firstname: '',
  lastname: '',
  companyID: '',
  password: '',
};

const RegisterForm: React.FC = () => {
  const [signUp, { isLoading, isError, error }] = useSignUpMutation();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [state, setState] = useState<RegisterMutation>(initialState);

  const handleFormSubmit = async (state: RegisterMutation) => {
    const response = await signUp(state).unwrap();
    message.success(response.message);
    navigate(appRoutes.redirect);
  };

  useEffect(() => {
    handleFormFieldError(isError, error, form);
  }, [isError, error, form]);

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
        onFinish={handleFormSubmit}
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
