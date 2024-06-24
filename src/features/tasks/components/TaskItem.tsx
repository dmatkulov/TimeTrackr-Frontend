import React from 'react';
import { Card, Dropdown, Flex, MenuProps, Space } from 'antd';
import { Task } from '../../../types/types.task';
import {
  ClockCircleOutlined,
  DeleteOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { useMediaQuery } from 'react-responsive';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectDeleteTaskLoading, toggleModal } from '../tasksSlice';
import TaskTag from './TaskTag';
import { convertTime } from '../../../utils/constants';

interface Props {
  task: Task;
  onDelete: (taskId: string) => void;
  onFetchOne: (taskId: string) => void;
}

const TaskItem: React.FC<Props> = ({ task, onDelete, onFetchOne }) => {
  const dispatch = useAppDispatch();
  const deleting = useAppSelector(selectDeleteTaskLoading);

  const { md, lg } = useBreakpoint();
  const lgXl = useMediaQuery({
    query: '(min-width: 1200px) and (max-width: 1340px)',
  });
  const xxs = useMediaQuery({
    query: '(min-width: 320px) and (max-width: 360px)',
  });

  const items: MenuProps['items'] = [
    {
      key: '1',
      danger: true,
      label: 'Удалить',
      onClick: (info) => {
        info.domEvent.stopPropagation();
        onDelete(task._id);
      },
      icon: <DeleteOutlined />,
      disabled: deleting,
    },
  ];

  const handleDropdownClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handToggleModal = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    dispatch(toggleModal(true));
    void onFetchOne(task._id);
  };

  const timeSpent = convertTime(task.timeSpent);

  return (
    <Card
      title={task.title}
      bordered={false}
      hoverable
      style={{ height: '100%' }}
      styles={{ header: { border: 'none' } }}
      extra={
        <Dropdown
          menu={{ items }}
          placement="topRight"
          arrow
          overlayStyle={{ zIndex: 10 }}
          trigger={['click']}
        >
          <div
            onClick={handleDropdownClick}
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
      onClick={handToggleModal}
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
          <ClockCircleOutlined color="blue" /> {timeSpent}
        </Space>
        <TaskTag task={task} />
      </Flex>
    </Card>
  );
};

export default TaskItem;
