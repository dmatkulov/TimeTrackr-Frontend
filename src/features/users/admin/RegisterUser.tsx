import React from 'react';
import UserForm from '../components/UserForm';
import { useAppSelector } from '../../../app/hooks';
import { selectRegisterLoading } from '../UsersSlice';

interface Props {
  open: boolean;
  onClose: () => void;
}

const RegisterUser: React.FC<Props> = ({ open, onClose }) => {
  const creating = useAppSelector(selectRegisterLoading);

  return (
    <>
      <UserForm open={open} onClose={onClose} loading={creating} />
    </>
  );
};

export default RegisterUser;
