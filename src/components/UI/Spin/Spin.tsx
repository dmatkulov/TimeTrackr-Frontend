import React from 'react';
import { Flex, Spin } from 'antd';

const Spinner: React.FC = () => {
  const contentStyle = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
  };

  const content = <div style={contentStyle} />;

  return (
    <Flex
      gap="small"
      vertical
      align="center"
      justify="center"
      style={{ height: '100vh' }}
    >
      <Flex gap="small">
        <Spin tip="Загрузка" size="large">
          {content}
        </Spin>
      </Flex>
    </Flex>
  );
};

export default Spinner;
