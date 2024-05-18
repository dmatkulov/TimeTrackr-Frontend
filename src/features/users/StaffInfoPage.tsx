import React, { useEffect } from 'react';
import UserProfile from './components/UserProfile';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectEmployee } from './UsersSlice';
import { getOneUser } from './UsersThunks';

const StaffInfoPage: React.FC = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const employee = useAppSelector(selectEmployee);

  useEffect(() => {
    dispatch(getOneUser(id));
  }, [dispatch]);

  console.log(employee);

  return (
    employee && (
      <div>
        <UserProfile employee={employee} />
      </div>
    )
  );
};

export default StaffInfoPage;
