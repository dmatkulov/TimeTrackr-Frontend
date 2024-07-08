import React from 'react';
import Tasks from '../Tasks/Tasks';

const Dashboard: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Tasks />
    </div>
  );
};

export default Dashboard;
