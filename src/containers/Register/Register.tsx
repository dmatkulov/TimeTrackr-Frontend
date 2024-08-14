import React from 'react';
import { RegisterMutation } from '../../types/types.user';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { appRoutes } from '../../utils/routes.service';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../store/features/auth/auth';

const Register: React.FC = () => {
  const [signUp, { isLoading }] = useSignUpMutation();
  const navigate = useNavigate();

  const handleFormSubmit = async (state: RegisterMutation) => {
    await signUp(state).unwrap();
    navigate(appRoutes.redirect);
  };
  return (
    <>
      <RegisterForm onSubmit={handleFormSubmit} loading={isLoading} />
    </>
  );
};

export default Register;
