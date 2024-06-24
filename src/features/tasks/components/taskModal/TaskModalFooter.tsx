import React from 'react';
import { Button, Flex } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

interface Props {
  onClose: () => void;
}

const TaskModalFooter: React.FC<Props> = ({ onClose }) => {
  const { sm } = useBreakpoint();

  return (
    <Flex key="1" justify="space-between" align="center">
      <Flex
        justify="space-between"
        gap={20}
        style={{ width: !sm ? '100%' : 'auto' }}
      >
        <Button style={{ boxShadow: 'none' }} type="primary">
          <EditOutlined />
          Редактировать
        </Button>
        <Button style={{ boxShadow: 'none' }} danger>
          <DeleteOutlined />
          {sm && 'Удалить'}
        </Button>
      </Flex>
      {sm && (
        <Button style={{ boxShadow: 'none' }} onClick={onClose}>
          Закрыть
        </Button>
      )}
    </Flex>
  );
};

export default TaskModalFooter;
