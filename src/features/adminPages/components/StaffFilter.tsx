import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormProps,
  Input,
  Row,
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
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

const StaffFilter: React.FC = () => {
  const positions = useAppSelector(selectPositions);
  const dispatch = useAppDispatch();
  const fetchLoading = useAppSelector(selectFetchAllLoading);
  const [form] = Form.useForm();

  const [isValid, setIsValid] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  const screens = useBreakpoint();
  const xs = !screens.md;
  const lg = !screens.xl;

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
      <Row>
        <Col xs={24} lg={4} style={{ marginBottom: '20px' }}>
          <Space>
            Фильтры
            <Switch size="small" defaultChecked onChange={onChange} />
          </Space>
        </Col>
        <Col xs={24} lg={20}>
          <Form
            style={{
              display: isChecked ? 'flex' : 'none',
              flexDirection: xs ? 'column' : 'row',
              flexWrap: lg ? 'wrap' : 'nowrap',
              gap: '16px',
              alignItems: 'flex-start',
            }}
            form={form}
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onSubmit}
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
                { message: 'Неверный формат электронной почты', type: 'email' },
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
        </Col>
      </Row>
    </>
  );
};

export default StaffFilter;
