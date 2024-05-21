import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const EmployeeHeader: React.FC = () => {
  return (
    <>
      <Button type="dashed" icon={<PlusOutlined />} iconPosition="start">
        Добавить задачу
      </Button>
    </>
  );
};

export default EmployeeHeader;
