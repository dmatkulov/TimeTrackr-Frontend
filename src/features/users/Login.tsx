import React, { useEffect, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Col, Form, Input, Row } from 'antd';
import { LoginMutation } from '../../types/types.user';
import Breadcrumbs from '../../components/UI/Breadcrumps/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../utils/routes';

const App: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState<boolean>(false);

  useEffect(() => {
    setClientReady(true);
  }, []);
  const onSubmit: FormProps<LoginMutation>['onFinish'] = async (values) => {
    navigate(appRoutes.profile);
    console.log(values);
    form.resetFields();
  };

  const onFinishFailed: FormProps<LoginMutation>['onFinishFailed'] = () => {
    form.resetFields();
  };

  return (
    <Row>
      <Col span={24} style={{ marginBottom: '50px' }}>
        <Breadcrumbs />
      </Col>
      <Col span={8} offset={8}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<LoginMutation>
            label="Почта"
            name="email"
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
            rules={[
              { required: true, message: 'Введите пароль' },
              { min: 8, message: 'Длина пароля не менее 8 символов' },
            ]}
            style={{ marginBottom: '24px' }}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }} shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                disabled={
                  !clientReady ||
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Войти
              </Button>
            )}
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default App;
