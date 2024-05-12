import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}
const FileInput: React.FC<Props> = ({ onChange, name }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [filename, setFilename] = useState('');
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFilename(selectedFile.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        setFileUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFilename('');
      setFileUrl('');
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
      <span
        className="ant-upload-wrapper css-dev-only-do-not-override-1okl62o ant-upload-picture-card-wrapper"
        // style={{ display: 'flex' }}
      >
        {fileUrl && (
          <div
            className="ant-upload-list ant-upload-list-picture-card"
            // style={{ marginRight: '16px' }}
          >
            <div className="ant-upload-list-item-container">
              <div className="ant-upload-list-item ant-upload-list-item-undefined">
                <div className="ant-upload-list-item-thumbnail">
                  <img
                    className="ant-upload-list-item-image"
                    alt="photo"
                    src={fileUrl}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="ant-upload ant-upload-select">
          <span className="ant-upload">
            <input
              style={{ display: 'none' }}
              type="file"
              name={name}
              onChange={onFileChange}
              ref={inputRef}
            />
            <button
              style={{ border: 0, background: 'none' }}
              type="button"
              onClick={activateInput}
            >
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>
                {filename ? 'Заменить' : 'Загрузить'}
              </div>
            </button>
          </span>
        </div>
      </span>
    </>
  );
};

export default FileInput;
