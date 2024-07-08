import React from 'react';
import { Form, Input } from 'antd';
import { UserMutation } from '../../types/types.user';

interface Props {
  state: UserMutation;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<Props> = ({ state, onChange }) => {
  const passwordRegExp = new RegExp(
    '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9@$!%*#?&^_-]{8,}$',
  );
  return (
    <>
      <Form.Item
        name="password"
        label="Пароль"
        rules={[
          {
            required: true,
            message: 'Укажите пароль',
          },
          {
            message: 'Используйте не менее 8 символов',
            min: 8,
          },
          {
            message:
              'Используйте цифры, буквы верхнего и нижнего регистров латинского алфавита',
            pattern: passwordRegExp,
          },
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
