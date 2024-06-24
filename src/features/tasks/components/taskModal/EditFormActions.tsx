import React, { CSSProperties } from 'react';
import { Button, Space } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const btnStyle: CSSProperties = {
  border: 'none',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
};

interface Props {
  onClick: () => void;
}

const EditFormActions: React.FC<Props> = ({ onClick }) => {
  return (
    <Space>
      <Button icon={<CheckOutlined />} style={btnStyle} />
      <Button icon={<CloseOutlined />} style={btnStyle} onClick={onClick} />
    </Space>
  );
};

export default EditFormActions;
