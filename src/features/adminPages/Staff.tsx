import React from 'react';
import StaffFilter from './components/StaffFilter';
import { useAppSelector } from '../../app/hooks';
import { selectFetchAllLoading } from '../users/UsersSlice';
import Spinner from '../../components/UI/Spin/Spin';

const Staff: React.FC = () => {
  const fetchLoading = useAppSelector(selectFetchAllLoading);
  return (
    <>
      <StaffFilter />
      {fetchLoading && <Spinner />}
    </>
  );
};

export default Staff;
