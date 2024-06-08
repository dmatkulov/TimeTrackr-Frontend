import React from 'react';
import { Task } from '../../../../types/types.task';
import { ProductFilled, RocketFilled, SettingFilled } from '@ant-design/icons';
import { Tag } from 'antd';

interface Props {
  task: Task;
}

const TaskTag: React.FC<Props> = ({ task }) => {
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
    <Tag color={tagColor} bordered={false} icon={icon}>
      {task.label}
    </Tag>
  );
};

export default TaskTag;
