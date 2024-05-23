import React, { useState } from 'react';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddPosition from '../../../positions/AddPosition';
import StaffRegister from '../StaffRegister';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

const AdminHeader: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [openPosition, setOpenPosition] = useState(false);

  const { sm } = useBreakpoint();
  const handleClosePosition = () => {
    setOpenPosition(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const items: MenuProps['items'] = [
    {
      label: 'Новый сотрудник',
      key: '1',
      onClick: () => setOpen(true),
    },
    {
      label: 'Новая позиция',
      key: '2',
      onClick: () => setOpenPosition(true),
    },
  ];

  return (
    <>
      {!sm ? (
        <Dropdown menu={{ items }}>
          <Button type="primary" icon={<PlusOutlined />}>
            Добавить
          </Button>
        </Dropdown>
      ) : (
        <Space align="center">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpen(true)}
          >
            Добавить сотрудника
          </Button>
          <Button
            type="link"
            icon={<PlusOutlined />}
            iconPosition="start"
            onClick={() => setOpenPosition(true)}
          >
            Создать позицую
          </Button>
        </Space>
      )}

      <StaffRegister open={open} onClose={handleClose} />
      <AddPosition open={openPosition} onClose={handleClosePosition} />
    </>
  );
};

export default AdminHeader;
