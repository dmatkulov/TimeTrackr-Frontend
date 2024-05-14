import React, { useState } from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import RegisterForm from './RegisterForm';

const AdminHeader: React.FC = () => {
  const { xs } = useBreakpoint();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space align="center" style={{ display: xs ? 'none' : 'flex' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleOpen}>
          Добавить сотрудника
        </Button>
        <Button type="text" icon={<PlusOutlined />} iconPosition="start">
          Создать позицую
        </Button>
      </Space>
      <RegisterForm open={open} onClose={handleClose} />
    </>
  );
};

export default AdminHeader;
