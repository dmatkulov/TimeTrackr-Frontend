import React, { useCallback, useEffect, useState } from 'react';
import TaskForm from '../../../tasks/components/TaskForm';
import { formattedDay } from '../../../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  selectTasks,
  selectTasksCreating,
  selectTasksLoading,
} from '../../../tasks/tasksSlice';
import { createTask, getTasks } from '../../../tasks/tasksThunks';
import { TaskMutation } from '../../../../types/types.task';
import Spinner from '../../../../components/UI/Spin/Spin';
import PageHeader from './PageHeader';
import TasksList from './TasksList';
import { Button, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TaskDescription from './TaskDescription';

interface Props {
  date: string;
}

const TasksTable: React.FC<Props> = ({ date }) => {
  const dispatch = useAppDispatch();
  const tasksData = useAppSelector(selectTasks);
  const creating = useAppSelector(selectTasksCreating);
  const fetching = useAppSelector(selectTasksLoading);

  const currentDay = formattedDay(date);

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

  return (
    <>
      <TaskDescription />
      <PageHeader handleOpen={handleOpen} date={date} />
      {fetching && <Spinner />}
      {tasksData && tasksData.tasks.length > 0 ? (
        <TasksList tasks={tasksData.tasks} fetchTasks={doFetchAll} />
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
