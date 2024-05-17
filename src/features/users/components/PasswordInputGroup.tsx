import React from 'react';
import { Col, Form, Input } from 'antd';
import { RegisterMutation } from '../../../types/types.user';

interface Props {
  state: RegisterMutation;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<Props> = ({ state, onChange }) => {
  return (
    <>
      <Col xs={{ span: 24 }} md={{ span: 8 }}>
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
          />
        </Form.Item>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 8 }}>
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
          <Input.Password />
        </Form.Item>
      </Col>
    </>
  );
};

export default PasswordInput;
