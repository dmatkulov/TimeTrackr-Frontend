import React, { useEffect, useMemo, useState } from 'react';
import { Button, Drawer, Flex, Form, Input } from 'antd';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import PhoneInput from 'react-phone-input-2';
import './index.css';

import { UserMutation } from '../../../types/types.user';
import { useAppDispatch } from '../../../store/hooks/hooks';
import FileInput from '../../FormInputGroups/FileInput';

dayjs.extend(buddhistEra);
dayjs.extend(utc);
dayjs.extend(timezone);

const initialState: UserMutation = {
  email: '',
  firstname: '',
  lastname: '',
  phoneNumber: '',
  photo: null,
};

interface Props {
  onSubmit: (state: UserMutation) => void;
  existingUser?: UserMutation;
  existingImage?: string | null;
  existingPhone?: string | null;
  open: boolean;
  onClose: () => void;
  isEdit?: boolean;
  loading?: boolean;
}

const ProfileForm: React.FC<Props> = ({
  onSubmit,
  existingUser = initialState,
  existingImage,
  existingPhone,
  open,
  onClose,
  isEdit = false,
  loading = false,
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const [state, setState] = useState<UserMutation>(existingUser);
  const [hasPhoneNumber, setHasPhoneNumber] = useState<boolean>(false);

  useEffect(() => {
    if (existingUser) {
      setState(existingUser);
      form.setFieldsValue({
        ...existingUser,
        phoneNumber: existingPhone ? existingPhone : null,
      });
      if (existingPhone) {
        setHasPhoneNumber(Boolean(existingPhone));
      }
    }
  }, [existingPhone, existingUser, form, dispatch]);

  const onFinish = async () => {
    try {
      const data = {
        ...state,
        photo:
          existingImage && state.photo === null ? existingImage : state.photo,
        phoneNumber:
          existingPhone && state.phoneNumber === null
            ? existingPhone
            : state.phoneNumber,
      };
      onSubmit(data);
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      if (name === 'phoneNumber') {
        return { ...state, phoneNumber: '0' + value };
      }
      return { ...prevState, [name]: value };
    });
  };

  const deletePhoneNumber = () => {
    setState((prevState) => ({ ...prevState, phoneNumber: 'delete' }));
    setHasPhoneNumber(false);
    form.setFieldsValue({
      phoneNumber: '',
    });
  };

  const addPhoneNumber = () => {
    setHasPhoneNumber(true);
  };

  const deletePhoto = () => {
    setState((prevState) => ({
      ...prevState,
      photo: 'delete',
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

  const selectedFilename = useMemo(() => {
    if (state.photo instanceof File) {
      return state.photo.name;
    } else if (state.photo === 'delete') {
      return undefined;
    } else if (existingImage) {
      return existingImage.split('/').pop();
    }
  }, [state.photo, existingImage]);

  const handlePhoneChange = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      phoneNumber: value,
    }));
  };

  return (
    <Drawer
      title={isEdit ? 'Обновление данных сотрудника' : 'Добавить сотрудника'}
      width={420}
      onClose={onClose}
      open={open}
      forceRender
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item name="photo">
          <FileInput
            name="photo"
            filename={selectedFilename}
            onChange={fileInputChangeHandler}
            onDelete={deletePhoto}
          />
        </Form.Item>
        <Form.Item
          label="Фамилия"
          name="lastname"
          rules={[{ required: true, message: 'Введите фамилию' }]}
        >
          <Input
            size="large"
            placeholder="Фамилия сотрудника"
            name="lastname"
            id={isEdit ? 'lastnameUpd' : 'lastname'}
            value={state.lastname}
            onChange={inputChangeHandler}
          />
        </Form.Item>
        <Form.Item
          label="Имя"
          name="firstname"
          rules={[{ required: true, message: 'Введите имя' }]}
        >
          <Input
            size="large"
            placeholder="Имя сотрудника"
            name="firstname"
            id={isEdit ? 'firstnameUpd' : 'firstname'}
            value={state.firstname}
            onChange={inputChangeHandler}
          />
        </Form.Item>
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
            size="large"
            placeholder="Электронная почта"
            name="email"
            id={isEdit ? 'emailUpd' : 'email'}
            value={state.email}
            onChange={inputChangeHandler}
          />
        </Form.Item>
        {hasPhoneNumber && (
          <Form.Item
            label="Номер телефона"
            name="phoneNumber"
            rules={[
              {
                validator: (_, value) => {
                  if (value && value.length > 3 && value.length !== 12) {
                    return Promise.reject('Введите номер полностью');
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <PhoneInput
              country="kg"
              masks={{ kg: '(...) ..-..-..' }}
              onlyCountries={['kg']}
              disableDropdown
              countryCodeEditable={false}
              value={state.phoneNumber}
              onChange={handlePhoneChange}
              inputProps={{
                name: 'phoneNumber',
              }}
            />
          </Form.Item>
        )}
        <Flex
          align="flex-end"
          justify="space-between"
          style={{ marginTop: '40px' }}
        >
          {hasPhoneNumber ? (
            <Button onClick={deletePhoneNumber}>Удалить номер</Button>
          ) : (
            <Button onClick={addPhoneNumber}>Добавить номер</Button>
          )}
          <Button htmlType="submit" type="primary" disabled={loading}>
            {isEdit ? 'Сохранить' : 'Отправить'}
          </Button>
        </Flex>
      </Form>
    </Drawer>
  );
};

export default ProfileForm;
