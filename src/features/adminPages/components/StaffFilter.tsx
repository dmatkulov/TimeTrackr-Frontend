import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Flex,
  Form,
  FormProps,
  Input,
  Select,
  Space,
  Switch,
} from 'antd';
import { selectPositions } from '../../positions/positionsSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectFetchAllLoading } from '../../users/UsersSlice';
import { getUsers } from '../../users/UsersThunks';
import { fetchPositions } from '../../positions/positionsThunks';
import { UserQueryValues } from '../../../types/types.user';
import { ClearOutlined, SearchOutlined } from '@ant-design/icons';

const StaffFilter: React.FC = () => {
  const positions = useAppSelector(selectPositions);
  const dispatch = useAppDispatch();
  const fetchLoading = useAppSelector(selectFetchAllLoading);
  const [form] = Form.useForm();

  const [isValid, setIsValid] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  const fetchOnInitOrReset = useCallback(async () => {
    await dispatch(getUsers());
    await dispatch(fetchPositions());
  }, [dispatch]);

  useEffect(() => {
    void fetchOnInitOrReset();
  }, [fetchOnInitOrReset]);

  const resetFormFields = () => {
    form.resetFields();
    setIsValid(false);
    void fetchOnInitOrReset();
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const onSubmit: FormProps<UserQueryValues>['onFinish'] = async (state) => {
    await dispatch(getUsers(state));
  };

  const onFinishFailed: FormProps<UserQueryValues>['onFinishFailed'] = () => {
    resetFormFields();
  };

  const checkIsValid = () => {
    setIsValid(true);
  };

  const onChange = (checked: boolean) => {
    setIsChecked(checked);
    if (!checked) {
      resetFormFields();
    }
  };

  return (
    <>
      <Flex
        align="start"
        gap="24px"
        style={{
          paddingBottom: '20px',
          borderBottom: '1px solid #ececec',
        }}
      >
        <Space>
          Фильтры
          <Switch size="small" defaultChecked onChange={onChange} />
        </Space>
        <Form
          style={{
            display: isChecked ? 'flex' : 'none',
            flexDirection: 'row',
            gap: '16px',
            alignItems: 'center',
            flexGrow: 1,
          }}
          form={form}
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="positions"
            style={{ flexGrow: 1, flexBasis: 250, marginBottom: 0 }}
          >
            <Select
              onChange={checkIsValid}
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
          <Form.Item name="lastname" style={{ width: 250, marginBottom: 0 }}>
            <Input
              placeholder="Поиск по фамилии"
              onChange={checkIsValid}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { message: 'Неверный формат электронной почты', type: 'email' },
            ]}
            style={{ width: 250, marginBottom: 0 }}
          >
            <Input
              placeholder="Поиск по почте"
              onChange={checkIsValid}
              allowClear
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: 24 }}
            shouldUpdate
            style={{ marginBottom: 0 }}
          >
            <Space size={0}>
              <Button
                htmlType="submit"
                icon={<SearchOutlined />}
                disabled={!isValid || fetchLoading}
                style={{ borderRadius: '8px 0 0 8px', borderRight: 'none' }}
              >
                Найти
              </Button>
              <Button
                icon={<ClearOutlined />}
                onClick={resetFormFields}
                disabled={!isValid || fetchLoading}
                style={{ borderRadius: '0 8px 8px 0' }}
              >
                Очистить
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Flex>
    </>
  );
};

export default StaffFilter;
