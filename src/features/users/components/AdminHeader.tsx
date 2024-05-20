import React, { useState } from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { Button, Space } from 'antd';
import { purple } from '@ant-design/colors';
import { PlusOutlined } from '@ant-design/icons';
import AddPosition from '../../positions/AddPosition';
import RegisterUser from '../admin/RegisterUser';

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
          icon={<PlusOutlined color={purple.primary} />}
          iconPosition="start"
          onClick={() => setOpenPosition(true)}
          style={{ color: purple.primary }}
        >
          Создать позицую
        </Button>
      </Space>
      <RegisterUser open={open} onClose={handleClose} />
      <AddPosition open={openPosition} onClose={handleClosePosition} />
    </>
  );
};

export default AdminHeader;
