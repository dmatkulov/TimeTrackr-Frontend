import React from 'react';
import UserForm from '../../components/RegisterForm/UserForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { selectRegisterLoading } from '../../store/users/UsersSlice';
import { UserMutation } from '../../types/types.user';
import { getUsers, register } from '../../store/users/UsersThunks';

interface Props {
  open: boolean;
  onClose: () => void;
}

const StaffRegister: React.FC<Props> = ({ open, onClose }) => {
  const creating = useAppSelector(selectRegisterLoading);
  const dispatch = useAppDispatch();

  const handleFormSubmit = async (state: UserMutation) => {
    await dispatch(register(state)).unwrap();
    await dispatch(getUsers());
  };

  return (
    <>
      <UserForm
        onSubmit={handleFormSubmit}
        open={open}
        onClose={onClose}
        loading={creating}
      />
    </>
  );
};

export default StaffRegister;
