import React, { useState } from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import RegisterForm from './RegisterForm';
import PositionForm from '../../../positions/components/PositionForm';

const AdminHeader: React.FC = () => {
  const { xs } = useBreakpoint();

  const [open, setOpen] = useState(false);
  const [openPosition, setOpenPosition] = useState(false);

  const handleClosePosition = () => {
    setOpenPosition(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space align="center" style={{ display: xs ? 'none' : 'flex' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          Добавить сотрудника
        </Button>
        <Button
          type="text"
          icon={<PlusOutlined />}
          iconPosition="start"
          onClick={() => setOpenPosition(true)}
        >
          Создать позицую
        </Button>
      </Space>
      <RegisterForm open={open} onClose={handleClose} />
      <PositionForm open={openPosition} onClose={handleClosePosition} />
    </>
  );
};

export default AdminHeader;
