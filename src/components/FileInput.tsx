import React, { useRef, useState } from 'react';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';
import { red } from '@ant-design/colors';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}
const FileInput: React.FC<Props> = ({ onChange, name }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [filename, setFilename] = useState<string | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }

    onChange(e);
  };

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
        onChange={onFileChange}
        ref={inputRef}
      />
      <Space style={{ gap: '20px' }}>
        <Button icon={<UploadOutlined />} onClick={activateInput}>
          Загрузить фото
        </Button>
        {filename && (
          <Space>
            <Typography.Text style={{ color: red.primary }}>
              {filename}
            </Typography.Text>
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Space>
        )}
      </Space>
    </>
  );
};

export default FileInput;
