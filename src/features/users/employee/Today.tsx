import React from 'react';
import TasksTable from '../../tasks/TasksTable';

const Today: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TasksTable />
    </div>
  );
};

export default Today;
