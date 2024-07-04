import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectRegisterLoading } from './UsersSlice';
import { UserMutation } from '../../types/types.user';
import { register } from './UsersThunks';
import RegisterForm from './RegisterForm';
import { appRoutes } from '../../utils/routes';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const creating = useAppSelector(selectRegisterLoading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleFormSubmit = async (state: UserMutation) => {
    await dispatch(register(state)).unwrap();
    navigate(appRoutes.redirect);
  };
  return (
    <>
      <RegisterForm onSubmit={handleFormSubmit} loading={creating} />
    </>
  );
};

export default Register;
