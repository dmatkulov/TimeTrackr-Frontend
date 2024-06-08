import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Button, Col, Divider, Flex, Row, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TaskForm from '../../../tasks/components/TaskForm';
import { formattedDay } from '../../../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  selectTasks,
  selectTasksCreating,
  selectTasksLoading,
} from '../../../tasks/tasksSlice';
import { createTask, deleteTask, getTasks } from '../../../tasks/tasksThunks';
import { TaskMutation } from '../../../../types/types.task';
import { useMediaQuery } from 'react-responsive';
import TaskItem from './TaskItem';
import Spinner from '../../../../components/UI/Spin/Spin';

const TasksTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasksData = useAppSelector(selectTasks);
  const creating = useAppSelector(selectTasksCreating);
  const fetching = useAppSelector(selectTasksLoading);

  const date = new Date();
  const todayString = dayjs(date).format('D MMMM, dddd');
  const currentDay = formattedDay(date);
  // const isToday = dayjs(date).isSame(dayjs(), 'day');

  const xxs = useMediaQuery({
    query: '(min-width: 320px) and (max-width: 480px)',
  });
  const [open, setOpen] = useState(false);

  const doFetchAll = useCallback(async () => {
    await dispatch(getTasks({ date: currentDay }));
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

  const handleSubmit = async (mutation: TaskMutation) => {
    await dispatch(createTask(mutation));
    await doFetchAll();
  };

  const handleDelete = async (taskId: string) => {
    if (tasksData) {
      await dispatch(deleteTask({ id: tasksData?._id, taskId }));
      void doFetchAll();
    }
  };

  return (
    <>
      <Flex justify="space-between" align="center">
        <Typography.Title level={4} style={{ margin: 0 }}>
          {`Сегодня ${todayString}`}
        </Typography.Title>
        <Button
          onClick={handleOpen}
          type="primary"
          icon={<PlusOutlined />}
          iconPosition="start"
          style={{
            position: xxs ? 'fixed' : 'relative',
            bottom: xxs ? '25px' : 'auto',
            left: xxs ? '50%' : '0',
            transform: xxs ? 'translateX(-50%)' : 'none',
            zIndex: 10,
          }}
        >
          Новая задача
        </Button>
        {xxs && (
          <div
            style={{
              height: '150px',
              background:
                'linear-gradient(180deg, rgb(245 245 245 / 0%) 0%, rgb(245, 245, 245) 100%)',
              position: xxs ? 'fixed' : 'relative',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              zIndex: 5,
            }}
          />
        )}
      </Flex>
      <TaskForm
        onSubmit={handleSubmit}
        onClose={handleClose}
        open={open}
        executionDate={currentDay}
        isToday
        creating={creating}
      />

      <Divider style={{ marginBottom: '40px' }} />
      {fetching && <Spinner />}
      {tasksData && tasksData.tasks.length > 0 ? (
        <Row gutter={16}>
          {tasksData.tasks.map((task) => (
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
      ) : (
        <>У вас пока нет задач на эту дату</>
      )}
    </>
  );
};

export default TasksTable;
