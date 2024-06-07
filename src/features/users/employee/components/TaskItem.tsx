import React from 'react';
import { Badge, Card, Flex, Tag } from 'antd';
import { Task } from '../../../../types/types.task';
import { ClockCircleOutlined } from '@ant-design/icons';

interface Props {
  task: Task;
}
const TaskItem: React.FC<Props> = ({ task }) => {
  return (
    <Card title={task.title} bordered={false} hoverable>
      <Flex justify="space-between" align="center">
        <Badge
          count={
            <>
              <Tag color="purple">
                <ClockCircleOutlined /> {task.timeSpent}
              </Tag>
            </>
          }
        />
        <Badge color="volcano" text={task.label} />
      </Flex>
    </Card>
  );
};

export default TaskItem;
