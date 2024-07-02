import React, { useCallback, useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import { currentDay } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectTasks,
  selectTasksCreating,
  selectTasksLoading,
} from './tasksSlice';
import { createTask, deleteTask, getTasks } from './tasksThunks';
import { TasksMutation } from '../../types/types.task';
import Spinner from '../../components/UI/Spin/Spin';
import PageHeader from '../users/components/PageHeader';
import { Button, Col, Row, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Statistics from './components/Statistics';
import TaskItem from './components/TaskItem';

interface Props {
  date?: string;
}

const TasksTable: React.FC<Props> = ({ date = currentDay }) => {
  const dispatch = useAppDispatch();
  const tasksData = useAppSelector(selectTasks);
  const creating = useAppSelector(selectTasksCreating);
  const fetching = useAppSelector(selectTasksLoading);

  const [open, setOpen] = useState(false);

  const doFetchAll = useCallback(async () => {
    await dispatch(getTasks({ date: date }));
  }, [dispatch]);

  useEffect(() => {
    void doFetchAll();
  }, [doFetchAll]);

  const handleClose = async () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async (mutation: TasksMutation) => {
    await dispatch(createTask(mutation));
    await doFetchAll();
  };

  const handleDelete = async (taskId: string) => {
    if (tasksData) {
      await dispatch(deleteTask({ id: tasksData?._id, taskId }));
      void doFetchAll();
    }
  };

  let totalTimeSpent;
  let amount;

  if (tasksData) {
    totalTimeSpent = tasksData.totalTimeSpent;
    amount = tasksData.tasks.length;
  }

  return (
    <>
      <PageHeader handleOpen={handleOpen} date={date} />
      {fetching ? (
        <Spinner />
      ) : tasksData && tasksData.tasks.length > 0 ? (
        <div
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}
        >
          <Row gutter={16}>
            {tasksData?.tasks.map((task) => (
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
          <Statistics
            totalTimeSpent={totalTimeSpent || 0}
            amount={amount || 0}
          />
        </div>
      ) : (
        <Space wrap={true} size="middle" align="center">
          <Typography.Text style={{ color: '#8c8c8c' }}>
            У вас пока нет задач на эту дату
          </Typography.Text>
          <Button
            onClick={handleOpen}
            type="link"
            icon={<PlusOutlined />}
            iconPosition="start"
            style={{ padding: 0 }}
          >
            Добавить первую задачу
          </Button>
        </Space>
      )}
      <TaskForm
        onSubmit={handleSubmit}
        onClose={handleClose}
        open={open}
        executionDate={currentDay}
        isToday
        creating={creating}
      />
    </>
  );
};

export default TasksTable;
