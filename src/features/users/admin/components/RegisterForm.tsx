import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Tooltip,
} from 'antd';
import ru from 'antd/es/date-picker/locale/ru_RU';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import { RegisterMutation } from '../../../../types/types.user';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchPositions } from '../../../positions/positionsThunks';
import { selectPositions } from '../../../positions/positionsSlice';
import FileInput from './Inputs/FileInput';
import { ClearOutlined } from '@ant-design/icons';
import ContactsInputGroup from './Inputs/ContactsInputGroup';
import PasswordInput from './Inputs/PasswordInput';
import { createUser } from '../../UsersThunks';

dayjs.extend(buddhistEra);

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
  open: boolean;
  onClose: () => void;
}

const RegisterForm: React.FC<Props> = ({
  existingUser = initialState,
  open,
  onClose,
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const positions = useAppSelector(selectPositions);

  const [state, setState] = useState<RegisterMutation>(existingUser);

  useEffect(() => {
    dispatch(fetchPositions());
  }, [dispatch]);

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

  const closeDrawer = () => {
    onClose();
    form.resetFields();
  };

  const deletePhoto = () => {
    setState((prevState) => ({
      ...prevState,
      photo: null,
    }));
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
  const onDateChange: DatePickerProps['onChange'] = (_date, dateString) => {
    if (typeof dateString === 'string') {
      setState((prevState) => {
        return {
          ...prevState,
          startDate: dateString ? new Date(dateString).toISOString() : '',
        };
      });
    }
  };

  // const onSubmit: FormProps<RegisterMutation>['onFinish'] = async (values) => {
  //   try {
  //     console.log(values);
  //     console.log('state', state);
  //     console.log('state', state.startDate);
  //     console.log(
  //       new Date(dayjs(values.startDate).toISOString()).toISOString(),
  //     );
  //     await dispatch(createUser(state)).unwrap();
  //     closeDrawer();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const onSubmit = async () => {
    try {
      await dispatch(createUser(state)).unwrap();
      closeDrawer();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Drawer
      title="Добавление нового сотрудника"
      width={720}
      onClose={closeDrawer}
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
        initialValues={{
          startDate: state.startDate
            ? dayjs(state.startDate)
            : dayjs(new Date()),
        }}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col xs={{ span: 24 }}>
            <Form.Item<RegisterMutation> name="photo">
              <FileInput
                name="photo"
                onChange={fileInputChangeHandler}
                onDelete={deletePhoto}
              />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item<RegisterMutation>
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
            <Form.Item<RegisterMutation>
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
            <Form.Item<RegisterMutation>
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
            <Form.Item<RegisterMutation>
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
          <ContactsInputGroup
            state={state}
            onInputChange={inputChangeHandler}
            onPhoneChange={handlePhoneChange}
          />
        </Row>
        <Row gutter={16}>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <Form.Item<RegisterMutation>
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
                allowClear={true}
                name="startDate"
                style={{ width: '100%' }}
                value={
                  state.startDate ? dayjs(state.startDate) : dayjs(new Date())
                }
                locale={buddhistLocale}
                onChange={onDateChange}
              />
            </Form.Item>
          </Col>
          <PasswordInput state={state} onChange={inputChangeHandler} />
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
