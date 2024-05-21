import React, { useEffect } from 'react';
import UserProfile from '../components/UserProfile';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectEmployee, selectFetchOneLoading } from '../UsersSlice';
import { getOneUser } from '../UsersThunks';
import Spinner from '../../../components/UI/Spin/Spin';

const StaffInfoPage: React.FC = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const employee = useAppSelector(selectEmployee);
  const loading = useAppSelector(selectFetchOneLoading);

  useEffect(() => {
    dispatch(getOneUser(id));
  }, [dispatch]);

  return (
    employee && (
      <>{loading ? <Spinner /> : <UserProfile employee={employee} />}</>
    )
  );
};

export default StaffInfoPage;
