import React, { useEffect, useMemo, useState } from 'react';
import { Button, Drawer, Form, FormProps, Input, Select } from 'antd';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { UserMutation } from '../../types/types.user';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { fetchPositions } from '../../store/positions/positionsThunks';
import { selectPositions } from '../../store/positions/positionsSlice';
import FileInput from '../FormInputGroups/FileInput';
import {
  selectUpdateError,
  unsetUpdateError,
} from '../../store/users/UsersSlice';
import { MaskedInput } from 'antd-mask-input';

dayjs.extend(buddhistEra);
dayjs.extend(utc);
dayjs.extend(timezone);

const initialState: UserMutation = {
  email: '',
  firstname: '',
  lastname: '',
  position: '',
  phoneNumber: '',
  password: '',
  photo: null,
};

interface Props {
  onSubmit: (state: UserMutation) => void;
  existingUser?: UserMutation;
  existingImage?: string | null;
  open: boolean;
  onClose: () => void;
  isEdit?: boolean;
  loading?: boolean;
}

const UserForm: React.FC<Props> = ({
  onSubmit,
  existingUser = initialState,
  existingImage,
  open,
  onClose,
  isEdit = false,
  loading = false,
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const positions = useAppSelector(selectPositions);
  const errors = useAppSelector(selectUpdateError);

  const [state, setState] = useState<UserMutation>(existingUser);

  useEffect(() => {
    if (existingUser) {
      setState(existingUser);
      form.setFieldsValue(existingUser);
    }
  }, [existingUser, form]);

  useEffect(() => {
    dispatch(fetchPositions());
  }, [dispatch]);

  useEffect(() => {
    if (errors) {
      form.setFields(
        errors.message.map((error) => ({
          name: error.property,
          errors: [error.message],
        })),
      );
    }
  }, [errors, form]);

  const onFinish = async () => {
    try {
      onSubmit({
        ...state,
        photo:
          existingImage && state.photo === null ? existingImage : state.photo,
      });

      console.log(errors);
      dispatch(unsetUpdateError());
      console.log(errors);
    } catch (e) {
      console.log(e);
    }
  };

  const onFinishFailed: FormProps<UserMutation>['onFinishFailed'] =
    async () => {
      return;
    };

  const closeDrawer = () => {
    form.resetFields();
    deletePhoto();
    onClose();
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
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

  const phoneMask = '(000) 00-00-00';

  const mask = useMemo(
    () => [
      {
        mask: phoneMask,
        lazy: false,
      },
    ],
    [],
  );

  return (
    <Drawer
      title={isEdit ? 'Обновление данных сотрудника' : 'Добавить сотрудника'}
      width={420}
      onClose={closeDrawer}
      open={open}
      forceRender
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{
          ...existingUser,
          phoneNumber: existingUser.phoneNumber.slice(3),
        }}
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
            placeholder="Электронная почта"
            name="email"
            id={isEdit ? 'emailUpd' : 'email'}
            value={state.email}
            onChange={inputChangeHandler}
          />
        </Form.Item>
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
        <Form.Item
          name="phoneNumber"
          label="Номер телефона"
          // rules={[
          //   {
          //     validator: (_, value) => {
          //       if (value && value.length > 3 && value.length < 9) {
          //         return Promise.reject('Введите номер полностью');
          //       }
          //       return Promise.resolve();
          //     },
          //   },
          // ]}
        >
          {/*<Input*/}
          {/*  onChange={inputChangeHandler}*/}
          {/*  name="phoneNumber"*/}
          {/*  value={state.phoneNumber.slice(3)}*/}
          {/*  type="number"*/}
          {/*  prefix={'+996'}*/}
          {/*/>*/}
          <MaskedInput
            value={state.phoneNumber.slice(3)}
            name="phoneNumber"
            onChange={(e) => {
              setState((prevState) => ({
                ...prevState,
                phoneNumber: '996' + e.unmaskedValue,
              }));
            }}
            addonBefore="+996"
            mask={mask}
          />
        </Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          style={{ width: '100%' }}
          disabled={loading}
        >
          {isEdit ? 'Обновить' : 'Отправить'}
        </Button>
      </Form>
    </Drawer>
  );
};

export default UserForm;
