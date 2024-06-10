import React from 'react';
import TasksTable from './components/TasksTable';

const Today: React.FC = () => {
  const date = new Date().toISOString();

  return <TasksTable date={date} />;
};

export default Today;
