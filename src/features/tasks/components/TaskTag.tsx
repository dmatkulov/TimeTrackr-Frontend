import React from 'react';
import { TaskMutation } from '../../../types/types.task';
import {
  MoreOutlined,
  ProductFilled,
  RocketFilled,
  SettingFilled,
} from '@ant-design/icons';
import { Space, Tag } from 'antd';

interface Props {
  task: TaskMutation;
  dropdown?: boolean;
}

const TaskTag: React.FC<Props> = ({ task, dropdown = false }) => {
  let tagColor = 'processing';
  let icon = <RocketFilled />;
  if (task.label === 'Доработка') {
    tagColor = 'purple';
    icon = <SettingFilled />;
  } else if (task.label === 'Менеджмент') {
    tagColor = 'orange';
    icon = <ProductFilled />;
  }
  return (
    <Tag
      color={tagColor}
      bordered={false}
      icon={icon}
      style={{
        height: '28px',
        display: 'flex',
        alignItems: 'center',
        marginRight: 0,
      }}
    >
      {dropdown ? (
        <Space>
          {task.label} <MoreOutlined />
        </Space>
      ) : (
        task.label
      )}
    </Tag>
  );
};

export default TaskTag;
