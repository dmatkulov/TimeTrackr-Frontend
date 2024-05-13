import React from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../../app/hooks';
import { toggleDrawer } from '../../UsersSlice';
import RegisterForm from './RegisterForm';

const AdminHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const { xs } = useBreakpoint();

  const openDrawer = () => {
    dispatch(toggleDrawer(true));
  };

  return (
    <>
      <Space align="center" style={{ display: xs ? 'none' : 'flex' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={openDrawer}>
          Добавить сотрудника
        </Button>
        <Button type="text" icon={<PlusOutlined />} iconPosition="start">
          Создать позицую
        </Button>
      </Space>
      <RegisterForm />
    </>
  );
};

export default AdminHeader;
