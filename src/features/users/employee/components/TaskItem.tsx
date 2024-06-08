import React from 'react';
import { Card, Dropdown, Flex, MenuProps, Space, Tag } from 'antd';
import { Task } from '../../../../types/types.task';
import {
  ClockCircleOutlined,
  DeleteOutlined,
  MoreOutlined,
  ProductFilled,
  RocketFilled,
  SettingFilled,
} from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { useMediaQuery } from 'react-responsive';
import { useAppSelector } from '../../../../app/hooks';
import { selectDeleteTaskLoading } from '../../../tasks/tasksSlice';

interface Props {
  task: Task;
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<Props> = ({ task, onDelete }) => {
  const deleting = useAppSelector(selectDeleteTaskLoading);
  const { md, lg } = useBreakpoint();
  const lgXl = useMediaQuery({
    query: '(min-width: 1200px) and (max-width: 1340px)',
  });
  const xxs = useMediaQuery({
    query: '(min-width: 320px) and (max-width: 360px)',
  });

  let tagColor = 'processing';
  let icon = <RocketFilled />;
  if (task.label === 'Доработка') {
    tagColor = 'purple';
    icon = <SettingFilled />;
  } else if (task.label === 'Менеджмент') {
    tagColor = 'orange';
    icon = <ProductFilled />;
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Описание',
    },
    {
      key: '2',
      label: 'Редактировать',
    },
    {
      key: '3',
      danger: true,
      label: 'Удалить',
      onClick: () => onDelete(task._id),
      icon: <DeleteOutlined />,
      disabled: deleting,
    },
  ];

  return (
    <Card
      title={task.title}
      bordered={false}
      hoverable
      style={{ boxShadow: 'none', height: '100%' }}
      styles={{ header: { border: 'none' } }}
      extra={
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <div
            style={{
              width: '24px',
              height: '24px',
              border: '1px solid #fafafa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: '#fafafa',
            }}
          >
            <MoreOutlined />
          </div>
        </Dropdown>
      }
    >
      <Flex
        justify="space-between"
        vertical={xxs}
        align={(md && !lg) || xxs ? 'flex-start' : 'center'}
        gap={12}
        wrap={md}
      >
        <Space
          size="small"
          style={{
            color: 'gray',
            fontSize: '12px',
            gap: '4px',
            width: lgXl ? '100%' : 'auto',
          }}
        >
          <ClockCircleOutlined color="blue" /> {task.timeSpent}
        </Space>
        <Tag color={tagColor} bordered={false} icon={icon}>
          {task.label}
        </Tag>
      </Flex>
    </Card>
  );
};

export default TaskItem;
