import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import TestTaskForm from './testForm';

const EmployeeHeader: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        type="primary"
        icon={<PlusOutlined />}
        iconPosition="start"
      >
        Добавить задачу
      </Button>
      <TestTaskForm onClose={handleClose} open={open} />
    </>
  );
};

export default EmployeeHeader;
