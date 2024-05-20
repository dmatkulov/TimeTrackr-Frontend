import React, { useRef } from 'react';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Flex, Space, Typography } from 'antd';
import { red } from '@ant-design/colors';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  onDelete: () => void;
  filename?: string;
}
const FileInput: React.FC<Props> = ({ onChange, name, onDelete, filename }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{ display: 'none' }}
        type="file"
        name={name}
        onChange={onChange}
        ref={inputRef}
      />
      <Flex align="center" justify="space-between">
        <Button icon={<UploadOutlined />} onClick={activateInput}>
          {filename ? 'Заменить фото' : 'Загрузить фото'}
        </Button>
        {filename && (
          <Space size="middle">
            <Typography.Text style={{ color: red.primary }}>
              {filename || ''}
            </Typography.Text>
            <Button danger icon={<DeleteOutlined />} onClick={onDelete} />
          </Space>
        )}
      </Flex>
    </>
  );
};

export default FileInput;
