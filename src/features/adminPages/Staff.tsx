import React, { useCallback, useEffect } from 'react';
import { Button, Form, FormProps, Input, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPositions } from '../positions/positionsSlice';
import { getUsers } from '../users/UsersThunks';
import { fetchPositions } from '../positions/positionsThunks';
import { UserQueryParams } from '../../types/types.user';

const Staff: React.FC = () => {
  const positions = useAppSelector(selectPositions);
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const fetchOnInitOrReset = useCallback(async () => {
    await dispatch(getUsers());
    await dispatch(fetchPositions());
  }, [dispatch]);

  useEffect(() => {
    void fetchOnInitOrReset();
  }, [fetchOnInitOrReset]);

  const resetFormFields = () => {
    form.resetFields();
    void fetchOnInitOrReset();
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const onSubmit: FormProps<UserQueryParams>['onFinish'] = async (
    queryParams,
  ) => {
    await dispatch(getUsers(queryParams));
  };

  return (
    <>
      <Form
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '24px',
          alignItems: 'flex-start',
          marginRight: '60px',
        }}
        form={form}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
      >
        <Form.Item name="positions" style={{ width: 300 }}>
          <Select
            showSearch
            mode="multiple"
            allowClear
            placeholder="Поиск по позициям"
            optionFilterProp="children"
            filterOption={filterOption}
            options={[
              ...positions.map((position) => ({
                value: position._id,
                label: position.name,
              })),
            ]}
          />
        </Form.Item>
        <Form.Item name="lastname" style={{ width: 300 }}>
          <Input placeholder="Введите фамилию" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { message: 'Неверный формат электронной почты', type: 'email' },
          ]}
          style={{ width: 300 }}
        >
          <Input placeholder="Введите почту" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }} shouldUpdate>
          {() => <Button htmlType="submit">Поиск</Button>}
        </Form.Item>
        <Form.Item>
          <Button onClick={resetFormFields}>Очистить</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Staff;
