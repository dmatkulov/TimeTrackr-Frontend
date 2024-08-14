import React, { useEffect } from 'react';
import UserProfile from '../../components/UserProfile/UserProfile';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import {
  selectEmployee,
  selectFetchOneLoading,
} from '../../store/features/users/UsersSlice';
import { getOneUser } from '../../store/features/users/UsersThunks';
import Spinner from '../../components/UI/Spin/Spin';
import { Breadcrumb } from 'antd';
import { appRoutes } from '../../utils/routes.service';

const StaffInfo: React.FC = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const employee = useAppSelector(selectEmployee);
  const loading = useAppSelector(selectFetchOneLoading);

  useEffect(() => {
    dispatch(getOneUser(id));
  }, [dispatch]);

  return (
    <>
      <Breadcrumb
        style={{ marginBottom: '20px' }}
        items={[
          {
            title: <a href={appRoutes.admin.staff}>Все сотрудники</a>,
          },
          {
            title: 'Профиль',
          },
        ]}
      />
      {employee && (
        <>{loading ? <Spinner /> : <UserProfile user={employee} />}</>
      )}
    </>
  );
};

export default StaffInfo;
