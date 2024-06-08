import React from 'react';
import { Task } from '../../../../types/types.task';
import { Col, Row } from 'antd';
import TaskItem from './TaskItem';
import { deleteTask } from '../../../tasks/tasksThunks';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectTasks } from '../../../tasks/tasksSlice';

interface Props {
  tasks: Task[];
  fetchTasks: () => void;
}

const TasksList: React.FC<Props> = ({ tasks, fetchTasks }) => {
  const dispatch = useAppDispatch();
  const tasksData = useAppSelector(selectTasks);

  const handleDelete = async (taskId: string) => {
    if (tasksData) {
      await dispatch(deleteTask({ id: tasksData?._id, taskId }));
      void fetchTasks();
    }
  };

  return (
    <Row gutter={16}>
      {tasks.map((task) => (
        <Col
          style={{ marginBottom: 16 }}
          key={task._id}
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          lg={{ span: 8 }}
          xl={{ span: 6 }}
        >
          <TaskItem task={task} onDelete={handleDelete} />
        </Col>
      ))}
    </Row>
  );
};

export default TasksList;
