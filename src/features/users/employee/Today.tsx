import React from 'react';
import TasksTable from '../../tasks/components/TasksTable';

const Today: React.FC = () => {
  const date = new Date().toISOString();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TasksTable date={date} />
    </div>
  );
};

export default Today;
