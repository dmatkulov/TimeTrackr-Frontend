import React, { useEffect, useState } from 'react';
import {
  Col,
  ConfigProvider,
  DatePicker,
  DatePickerProps,
  Form,
  FormProps,
  Input,
  Row,
  Select,
} from 'antd';
import locale from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { RegisterMutation } from '../../../../types/types.user';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchPositions } from '../../../positions/positionsThunks';
import { selectPositions } from '../../../positions/positionsSlice';
import FileInput from '../../../../components/FileInput';

dayjs.locale('ru');

interface Props {
  existingUser?: RegisterMutation;
  isEdit?: boolean;
}

interface Temp {
  startDate: string;
  photo: File | null;
}

const RegisterForm: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const positions = useAppSelector(selectPositions);

  const [selectedDate, setSelectedDate] = useState<Temp>({
    startDate: '',
    photo: null,
  });
  const [form] = Form.useForm();

  const fileInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { files } = event.target;
    if (files) {
      setSelectedDate((prevState) => ({
        ...prevState,
        photo: files[0],
      }));
    }
  };

  useEffect(() => {
    dispatch(fetchPositions());
  }, [dispatch]);

  const onSubmit: FormProps<RegisterMutation>['onFinish'] = async (data) => {
    const formData: RegisterMutation = {
      ...data,
      startDate: selectedDate.startDate,
      photo: selectedDate.photo,
    };

    console.log('formData: ', formData);
  };

  const onDateChange: DatePickerProps['onChange'] = (date) => {
    setSelectedDate((prevState) => {
      return { ...prevState, startDate: date.toISOString() };
    });
  };

  return (
    <Form
      id="register"
      form={form}
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onSubmit}
      autoComplete="off"
    >
      <span className="ant-upload"></span>
      <Row gutter={16}>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <Form.Item
            label="Фамилия"
            name="lastname"
            rules={[{ required: true, message: 'Введите фамилию' }]}
          >
            <Input placeholder="Фамилия сотрудника" />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <Form.Item
            label="Имя"
            name="firstname"
            rules={[{ required: true, message: 'Введите имя' }]}
          >
            <Input placeholder="Имя сотрудника" />
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
            <Input placeholder="Электронная почта" />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <Form.Item
            name="position"
            label="Позиция"
            rules={[{ required: true, message: 'Выберите позицию' }]}
          >
            <Select
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
            <Input placeholder="Город проживания" />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 8 }}>
          <Form.Item
            label="Улица"
            name={['contactInfo', 'street']}
            rules={[{ required: true, message: 'Укажите улицу' }]}
          >
            <Input placeholder="Улица" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={{ span: 24 }} md={{ span: 8 }}>
          <Form.Item
            label="Дата начала работы"
            name="startDate"
            rules={[{ required: true }]}
          >
            <ConfigProvider locale={locale}>
              <DatePicker
                onChange={onDateChange}
                style={{ width: '100%' }}
                name="startDate"
              />
            </ConfigProvider>
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
            <Input.Password />
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
      <Row gutter={16} style={{ display: 'flex', alignItems: 'flex-end' }}>
        <Col>
          <Form.Item label="Upload" name="photo">
            <FileInput onChange={fileInputChangeHandler} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default RegisterForm;
