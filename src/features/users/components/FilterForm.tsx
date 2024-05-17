import React, { useState } from 'react';
import { Button, Form, FormProps, Input, Select, Space } from 'antd';
import { ClearOutlined, SearchOutlined } from '@ant-design/icons';
import { UserQueryValues } from '../../../types/types.user';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { Position } from '../../../types/types.position';

interface Props {
  onSubmit: (values: UserQueryValues) => void;
  loading: boolean;
  positions: Position[];
  getAllStaff: () => void;
}
const FilterForm: React.FC<Props> = ({
  onSubmit,
  loading,
  positions,
  getAllStaff,
}) => {
  const [isValid, setIsValid] = useState(false);
  const [form] = Form.useForm();

  const resetFormFields = () => {
    form.resetFields();
    setIsValid(false);
    void getAllStaff();
  };

  const onFormSubmit: FormProps<UserQueryValues>['onFinish'] = async (
    state,
  ) => {
    onSubmit(state);
  };

  const onFinishFailed: FormProps<UserQueryValues>['onFinishFailed'] = () => {
    resetFormFields();
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const checkIsValid = () => {
    setIsValid(true);
  };

  const screens = useBreakpoint();
  const xs = !screens.md;
  const lg = !screens.xl;
  return (
    <>
      <Form
        style={{
          display: 'flex',
          flexDirection: xs ? 'column' : 'row',
          flexWrap: lg ? 'wrap' : 'nowrap',
          gap: '16px',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
        }}
        form={form}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFormSubmit}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="positions"
          style={{
            flexGrow: 1,
            minWidth: 260,
            width: xs ? '100%' : 'auto',
            marginBottom: 0,
          }}
        >
          <Select
            notFoundContent="Ничего не удалось найти"
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
        <Form.Item
          name="lastname"
          style={{
            flexGrow: 1,
            marginBottom: 0,
            width: xs ? '100%' : 'auto',
          }}
        >
          <Input
            placeholder="Поиск по фамилии"
            onChange={checkIsValid}
            allowClear
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              message: 'Неверный формат электронной почты',
              type: 'email',
            },
          ]}
          style={{
            flexGrow: 1,
            marginBottom: 0,
            width: xs ? '100%' : 'auto',
          }}
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
              disabled={!isValid || loading}
              style={{ borderRadius: '8px 0 0 8px', borderRight: 'none' }}
            >
              Найти
            </Button>
            <Button
              icon={<ClearOutlined />}
              onClick={resetFormFields}
              disabled={!isValid || loading}
              style={{ borderRadius: '0 8px 8px 0' }}
            >
              Очистить
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default FilterForm;
