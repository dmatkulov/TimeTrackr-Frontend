import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Divider,
  Drawer,
  Form,
  FormProps,
  Input,
  Row,
  Select,
  Tooltip,
} from 'antd';
import { RegisterMutation } from '../../../../types/types.user';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchPositions } from '../../../positions/positionsThunks';
import { selectPositions } from '../../../positions/positionsSlice';
import FileInput from '../../../../components/FileInput';
import { selectOpenDrawer, toggleDrawer } from '../../UsersSlice';
import { ClearOutlined } from '@ant-design/icons';

const initialState: RegisterMutation = {
  email: '',
  firstname: '',
  lastname: '',
  position: '',
  contactInfo: {
    mobile: '',
    city: '',
    street: '',
  },
  password: '',
  startDate: '',
  photo: null,
};

interface Props {
  existingUser?: RegisterMutation;
  isEdit?: boolean;
}

const RegisterForm: React.FC<Props> = ({ existingUser = initialState }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const positions = useAppSelector(selectPositions);
  const [state, setState] = useState<RegisterMutation>(existingUser);

  const open = useAppSelector(selectOpenDrawer);

  useEffect(() => {
    dispatch(fetchPositions());
  }, [dispatch]);

  const onSubmit: FormProps<RegisterMutation>['onFinish'] = async () => {
    console.log('state: ', state);
    form.resetFields();
  };

  const onClose = () => {
    dispatch(toggleDrawer(false));
    form.resetFields();
  };

  const contactInfo = Object.keys(state.contactInfo);
  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });

    if (contactInfo.includes(name)) {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
        contactInfo: {
          ...prevState.contactInfo,
          [name]: value,
        },
      }));
    }
  };

  const deletePhoto = () => {
    setState((prevState) => ({
      ...prevState,
      photo: null,
    }));
  };

  const fileInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = event.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };
  const onDateChange: DatePickerProps['onChange'] = (date) => {
    setState((prevState) => {
      return { ...prevState, startDate: date.toISOString() };
    });
  };

  return (
    <Drawer
      title="Добавление нового сотрудника"
      width={720}
      onClose={onClose}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form
        id="register"
        form={form}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col xs={{ span: 24 }}>
            <Form.Item name="photo">
              <FileInput
                name="photo"
                onChange={fileInputChangeHandler}
                onDelete={deletePhoto}
              />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item
              label="Фамилия"
              name="lastname"
              rules={[{ required: true, message: 'Введите фамилию' }]}
            >
              <Input
                placeholder="Фамилия сотрудника"
                name="lastname"
                value={state.lastname}
                onChange={inputChangeHandler}
              />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item
              label="Имя"
              name="firstname"
              rules={[{ required: true, message: 'Введите имя' }]}
            >
              <Input
                placeholder="Имя сотрудника"
                name="firstname"
                value={state.firstname}
                onChange={inputChangeHandler}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
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
                value={state.email}
                onChange={inputChangeHandler}
              />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item
              name="position"
              label="Позиция"
              rules={[{ required: true, message: 'Выберите позицию' }]}
            >
              <Select
                value={state.position}
                onChange={(value) =>
                  setState((prevState) => ({
                    ...prevState,
                    position: value,
                  }))
                }
                placeholder="Позиция сотрудника"
                options={[
                  ...positions.map((position) => ({
                    value: position._id,
                    label: position.name,
                  })),
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <Form.Item
              label="Телефон"
              name={['contactInfo', 'mobile']}
              rules={[{ required: true, message: 'Укажите номер телефона' }]}
            >
              <Input
                onChange={inputChangeHandler}
                name="mobile"
                value={state.contactInfo.mobile}
                addonBefore={'+996'}
                style={{ width: '100%' }}
                type="number"
              />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <Form.Item
              label="Город"
              name={['contactInfo', 'city']}
              rules={[{ required: true, message: 'Укажите город' }]}
            >
              <Input
                name="city"
                value={state.contactInfo.city}
                onChange={inputChangeHandler}
                placeholder="Город проживания"
              />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <Form.Item
              label="Улица"
              name={['contactInfo', 'street']}
              rules={[{ required: true, message: 'Укажите улицу' }]}
            >
              <Input
                name="street"
                onChange={inputChangeHandler}
                value={state.contactInfo.street}
                placeholder="Улица"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <Form.Item
              label="Дата начала работы"
              name="startDate"
              rules={[{ required: true, message: 'Введите дату' }]}
            >
              <DatePicker
                onChange={onDateChange}
                style={{ width: '100%' }}
                name="startDate"
              />
            </Form.Item>
          </Col>
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
                onChange={inputChangeHandler}
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
        </Row>
        <Divider style={{ marginTop: 16 }} />
        <Row
          gutter={16}
          style={{
            display: 'flex',
            marginTop: 30,
            justifyContent: 'space-between',
          }}
        >
          <Col>
            <Tooltip placement="right" title="Очистить">
              <Button
                icon={<ClearOutlined />}
                danger
                onClick={() => form.resetFields()}
              />
            </Tooltip>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <Button
              htmlType="submit"
              form="register"
              type="primary"
              style={{ width: '100%' }}
            >
              Отправить
            </Button>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default RegisterForm;
