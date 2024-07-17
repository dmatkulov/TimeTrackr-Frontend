import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { selectRegisterLoading } from '../../store/users/UsersSlice';
import { UserMutation } from '../../types/types.user';
import { register } from '../../store/users/UsersThunks';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { appRoutes } from '../../services/routes.service';
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
