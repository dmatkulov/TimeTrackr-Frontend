import React, { useEffect, useState } from 'react';
import { ContactInfo, UserMutation } from '../../types/types.user';
import { formattedDay } from '../../utils/constants';
import { Button, Form, Input, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPositions } from '../positions/positionsSlice';
import { fetchPositions } from '../positions/positionsThunks';
import PasswordInput from './components/PasswordInputGroup';

const contactsState: ContactInfo = {
  mobile: '',
  city: '',
  street: '',
};

const initialState: UserMutation = {
  email: '',
  firstname: '',
  lastname: '',
  position: '',
  contactInfo: contactsState,
  password: '',
  startDate: formattedDay(new Date()),
  photo: null,
};

interface Props {
  onSubmit: (state: UserMutation) => void;
  loading?: boolean;
}

const RegisterForm = ({ onSubmit, loading }: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const positions = useAppSelector(selectPositions);

  const [state, setState] = useState<UserMutation>(initialState);

  useEffect(() => {
    dispatch(fetchPositions());
  }, [dispatch]);

  const onFinish = async () => {
    try {
      onSubmit(state);
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
        <Form.Item
          name="position"
          label="Должность"
          rules={[{ required: true, message: 'Выберите позицию' }]}
        >
          <Select
            size="large"
            value={state.position}
            onChange={(value) =>
              setState((prevState) => ({
                ...prevState,
                position: value,
              }))
            }
            placeholder="Выберите должность"
            options={[
              ...positions.map((position) => ({
                value: position._id,
                label: position.name,
              })),
            ]}
          />
        </Form.Item>
        <PasswordInput state={state} onChange={inputChangeHandler} />
        <Form.Item>
          <Button
            size="large"
            htmlType="submit"
            type="primary"
            style={{ width: '100%', margin: '16px 0' }}
            disabled={loading}
          >
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default RegisterForm;
