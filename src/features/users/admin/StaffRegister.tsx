import React from 'react';
import UserForm from '../components/UserForm';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectRegisterLoading } from '../UsersSlice';
import { UserMutation } from '../../../types/types.user';
import { createUser, getUsers } from '../UsersThunks';

interface Props {
  open: boolean;
  onClose: () => void;
}

const StaffRegister: React.FC<Props> = ({ open, onClose }) => {
  const creating = useAppSelector(selectRegisterLoading);
  const dispatch = useAppDispatch();

  const handleFormSubmit = async (state: UserMutation) => {
    await dispatch(createUser(state)).unwrap();
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
