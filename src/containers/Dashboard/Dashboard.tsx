import React from 'react';
import Tasks from '../Tasks/Tasks';
import { useAppSelector } from '../../store/hooks/hooks';
import { selectUser } from '../../store/users/UsersSlice';

const Dashboard: React.FC = () => {
  const user = useAppSelector(selectUser);
  console.log(user);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Tasks />
    </div>
  );
};

export default Dashboard;
