import React, { useRef } from 'react';
import { DeleteFilled, UploadOutlined } from '@ant-design/icons';
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
        <Button type="dashed" icon={<UploadOutlined />} onClick={activateInput}>
          {filename ? 'Заменить фото' : 'Загрузить фото'}
        </Button>
        {filename && (
          <Space size="middle" style={{ textOverflow: 'ellipsis' }}>
            <Typography.Text
              style={{
                display: 'block',
                color: red.primary,
                maxWidth: '100px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {filename || ''}
            </Typography.Text>
            <Button
              type="text"
              danger
              icon={<DeleteFilled />}
              onClick={onDelete}
            />
          </Space>
        )}
      </Flex>
    </>
  );
};

export default FileInput;
