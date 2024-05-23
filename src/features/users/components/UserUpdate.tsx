import React from 'react';
import UserForm from './UserForm';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUserUpdateLoading } from '../UsersSlice';
import dayjs from 'dayjs';
import { User, UserMutation } from '../../../types/types.user';
import { updateUser } from '../UsersThunks';
import { Navigate } from 'react-router-dom';
import { appRoutes } from '../../../utils/routes';

interface Props {
  open: boolean;
  onClose: () => void;
  employee: User;
}

const UserUpdate: React.FC<Props> = ({ open, onClose, employee }) => {
  const dispatch = useAppDispatch();
  const updating = useAppSelector(selectUserUpdateLoading);

  if (!employee) {
    return <Navigate to={appRoutes.notFound} />;
  }

  const handleSubmit = async (state: UserMutation) => {
    if (employee) {
      await dispatch(updateUser({ id: employee._id, mutation: state }));
    }
  };

  let form;
  if (employee) {
    const startDate = dayjs(employee.startDate).format('YYYY-MM-DD');

    const mutation: UserMutation = {
      ...employee,
      position: employee.position._id,
      startDate: startDate,
      photo: null,
    };
    form = (
      <UserForm
        onSubmit={handleSubmit}
        existingUser={mutation}
        open={open}
        onClose={onClose}
        loading={updating}
        existingImage={employee.photo}
        isEdit
      />
    );
  }

  return <>{form}</>;
};

export default UserUpdate;
