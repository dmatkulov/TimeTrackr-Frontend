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

const TasksTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasksData = useAppSelector(selectTasks);
  const creating = useAppSelector(selectTasksCreating);
  const fetching = useAppSelector(selectTasksLoading);

  const date = new Date().toISOString();
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
      <PageHeader handleOpen={handleOpen} date={date} />
      {fetching && <Spinner />}
      {tasksData && tasksData.tasks.length > 0 ? (
        <TasksList tasks={tasksData.tasks} fetchTasks={doFetchAll} />
      ) : (
        <>У вас пока нет задач на эту дату</>
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
