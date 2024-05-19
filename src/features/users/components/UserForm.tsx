import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Tooltip,
} from 'antd';

import ru from 'antd/es/date-picker/locale/ru_RU';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { UserMutation } from '../../../types/types.user';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchPositions } from '../../positions/positionsThunks';
import { ClearOutlined } from '@ant-design/icons';
import { selectPositions } from '../../positions/positionsSlice';
import ContactsInputGroup from './ContactsInputGroup';
import FileInput from './FileInput';
import PasswordInput from './PasswordInputGroup';

dayjs.extend(buddhistEra);
dayjs.extend(utc);
dayjs.extend(timezone);

const buddhistLocale: typeof ru = {
  ...ru,
  lang: {
    ...ru.lang,
    fieldDateFormat: 'YYYY-MM-DD',
    fieldDateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
    yearFormat: 'YYYY',
    cellYearFormat: 'YYYY',
  },
};

const initialState: UserMutation = {
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
  existingUser?: UserMutation;
  open: boolean;
  onClose: () => void;
  isEdit?: boolean;
  loading: boolean;
}

const UserForm: React.FC<Props> = ({
  existingUser = initialState,
  open,
  onClose,
  isEdit = false,
  loading,
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const positions = useAppSelector(selectPositions);

  const [state, setState] = useState<UserMutation>(initialState);

  useEffect(() => {
    if (existingUser) {
      setState(existingUser);

      form.setFieldsValue({
        ...existingUser,
        startDate: dayjs(existingUser.startDate),
      });
    }
  }, [existingUser, form]);

  useEffect(() => {
    dispatch(fetchPositions());
  }, [dispatch]);

  const onSubmit = async () => {
    try {
      console.log(state);
      // await dispatch(createUser(state)).unwrap();
      // await dispatch(getUsers());
      closeDrawer();
    } catch (e) {
      console.log(e);
    }
  };

  const handlePhoneChange = (value: string) => {
    setState((prevState) => {
      return {
        ...prevState,
        contactInfo: {
          ...prevState.contactInfo,
          mobile: value,
        },
      };
    });
  };

  const closeDrawer = () => {
    onClose();
    form.resetFields();
  };

  const contactInfo = Object.keys(state.contactInfo);
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      photo: existingUser ? 'delete' : null,
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

  return (
    <Drawer
      title={isEdit ? 'Обновление данных сотрудника' : 'Добавить сотрудника'}
      width={720}
      onClose={closeDrawer}
      open={open}
      forceRender
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
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
                id={isEdit ? 'lastnameUpd' : 'lastname'}
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
                id={isEdit ? 'firstnameUpd' : 'firstname'}
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
                id={isEdit ? 'emailUpd' : 'email'}
                value={state.email}
                onChange={inputChangeHandler}
              />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item
              name="position"
              label="Позиция"
              id={isEdit ? 'positionUpd' : 'position'}
              rules={[{ required: true, message: 'Выберите позицию' }]}
            >
              <Select
                value={state.position}
                id={isEdit ? 'positionUpd' : 'position'}
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
          <ContactsInputGroup
            state={state}
            onInputChange={inputChangeHandler}
            onPhoneChange={handlePhoneChange}
          />
        </Row>
        <Row gutter={16}>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <Form.Item
              label="Дата начала работы"
              name="startDate"
              rules={[
                {
                  type: 'object' as const,
                  required: true,
                  message: 'Введите дату',
                },
              ]}
            >
              <DatePicker
                allowClear={false}
                name="startDate"
                id={isEdit ? 'startDateUpd' : 'startDate'}
                style={{ width: '100%' }}
                value={
                  state.startDate ? dayjs(state.startDate) : dayjs(new Date())
                }
                onChange={(_date, dateString) => {
                  if (typeof dateString === 'string') {
                    setState((prevState) => {
                      return {
                        ...prevState,
                        startDate: new Date(dateString).toISOString(),
                      };
                    });
                  }
                }}
                locale={buddhistLocale}
              />
            </Form.Item>
          </Col>
          {!isEdit && (
            <PasswordInput state={state} onChange={inputChangeHandler} />
          )}
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
              type="primary"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {isEdit ? 'Обновить' : 'Отправить'}
            </Button>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default UserForm;
