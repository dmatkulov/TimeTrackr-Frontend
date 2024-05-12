import React from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const AdminHeader: React.FC = () => {
  const { xs } = useBreakpoint();

  return (
    <>
      <Space align="center" style={{ display: xs ? 'none' : 'flex' }}>
        <Button type="primary" icon={<PlusOutlined />}>
          Добавить сотрудника
        </Button>
        <Button type="text" icon={<PlusOutlined />} iconPosition="start">
          Создать позицую
        </Button>
      </Space>
    </>
  );
};

export default AdminHeader;
