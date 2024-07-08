import React from 'react';
import { Form, Input } from 'antd';
import { UserMutation } from '../../types/types.user';

interface Props {
  state: UserMutation;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<Props> = ({ state, onChange }) => {
  return (
    <>
      <Form.Item
        name="password"
        label="Пароль"
        rules={[
          { required: true, message: 'Введите пароль' },
          { min: 8, message: 'Длина пароля не менее 8 символов' },
        ]}
        hasFeedback
      >
        <Input.Password
          name="password"
          value={state.password}
          onChange={onChange}
          autoComplete="new-password"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Подтвердите пароль"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Введите пароль повторно',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают'));
            },
          }),
        ]}
      >
        <Input.Password size="large" autoComplete="new-password" />
      </Form.Item>
    </>
  );
};

export default PasswordInput;
