import React from 'react';
import { Col, Form, Input } from 'antd';
import { RegisterMutation } from '../../../../../types/types.user';

const PasswordInput: React.FC = () => {
  return (
    <>
      <Col xs={{ span: 24 }} md={{ span: 8 }}>
        <Form.Item<RegisterMutation>
          name="password"
          label="Пароль"
          rules={[
            { required: true, message: 'Введите пароль' },
            { min: 8, message: 'Длина пароля не менее 8 символов' },
          ]}
          hasFeedback
        >
          <Input.Password name="password" autoComplete="new-password" />
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
          <Input.Password autoComplete="new-password" />
        </Form.Item>
      </Col>
    </>
  );
};

export default PasswordInput;
