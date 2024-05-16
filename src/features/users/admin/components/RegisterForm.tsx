import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Form,
  FormProps,
  Input,
  Row,
  Select,
  Tooltip,
  Upload,
  UploadProps,
} from 'antd';
import ru from 'antd/es/date-picker/locale/ru_RU';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import { RegisterMutation } from '../../../../types/types.user';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchPositions } from '../../../positions/positionsThunks';
import { selectPositions } from '../../../positions/positionsSlice';
import { ClearOutlined, UploadOutlined } from '@ant-design/icons';
import ContactsInputGroup from './Inputs/ContactsInputGroup';
import PasswordInput from './Inputs/PasswordInput';

import utc from 'dayjs/plugin/utc';

dayjs.extend(buddhistEra);
dayjs.extend(utc);

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
  startDate: '',
  photo: null,
  password: '',
  confirm: '',
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
    if (existingUser) {
      form.setFieldsValue(existingUser);
    }
  }, [existingUser, form]);

  useEffect(() => {
    dispatch(fetchPositions());
  }, [dispatch]);

  const closeDrawer = () => {
    onClose();
    form.resetFields();
  };

  const onSubmit: FormProps<RegisterMutation>['onFinish'] = async (values) => {
    try {
      const result: RegisterMutation = {
        ...values,
        photo: state.photo,
        startDate: dayjs(values.startDate).format(),
      };

      console.log(dayjs(values.startDate).utc().format());

      // await dispatch(createUser(result)).unwrap();
      // closeDrawer();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const props: UploadProps = {
    onRemove: () => {
      setState((prevState) => ({ ...prevState, photo: null }));
    },
    openFileDialogOnClick: true,
    beforeUpload: (file) => {
      setState((prevState) => ({
        ...prevState,
        photo: file,
      }));
      return false;
    },
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

  return (
    <Drawer
      title="Добавление нового сотрудника"
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
      <Form
        id="register"
        form={form}
        layout="vertical"
        initialValues={existingUser}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col xs={{ span: 24 }}>
            <Form.Item<RegisterMutation> name="photo" valuePropName="photo">
              <Upload {...props} listType="picture">
                {!state.photo && (
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item<RegisterMutation>
              label="Фамилия"
              name="lastname"
              rules={[{ required: true, message: 'Введите фамилию' }]}
            >
              <Input placeholder="Фамилия сотрудника" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item<RegisterMutation>
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
              <Input placeholder="Электронная почта" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item<RegisterMutation>
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
        <Divider style={{ marginTop: 16 }} />
        <Row gutter={16}>
          <ContactsInputGroup state={state} onPhoneChange={handlePhoneChange} />
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
                // value={
                //   state.startDate ? dayjs(state.startDate) : dayjs(new Date())
                // }
                locale={buddhistLocale}
              />
            </Form.Item>
          </Col>
          <PasswordInput />
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
