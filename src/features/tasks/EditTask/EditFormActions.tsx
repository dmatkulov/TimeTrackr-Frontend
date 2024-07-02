import React, { CSSProperties } from 'react';
import { Button, Space } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const btnStyle: CSSProperties = {
  border: 'none',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
};

interface Props {
  onApprove: () => void;
  onCancel: () => void;
}

const EditFormActions: React.FC<Props> = ({ onApprove, onCancel }) => {
  return (
    <Space>
      <Button icon={<CheckOutlined />} style={btnStyle} onClick={onApprove} />
      <Button icon={<CloseOutlined />} style={btnStyle} onClick={onCancel} />
    </Space>
  );
};

export default EditFormActions;
