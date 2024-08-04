import React from 'react';
import StaffForm from '../../components/RegisterForm/StaffForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { selectUserUpdateLoading } from '../../store/users/UsersSlice';
import { User, UserMutation } from '../../types/types.user';
import { updateUser } from '../../store/users/UsersThunks';
import { Navigate } from 'react-router-dom';
import { appRoutes } from '../../services/routes.service';

interface Props {
  open: boolean;
  onClose: () => void;
  user: User;
  isGoogleUser?: boolean;
}

const UserUpdate: React.FC<Props> = ({
  open,
  onClose,
  user,
  isGoogleUser = false,
}) => {
  const dispatch = useAppDispatch();
  const updating = useAppSelector(selectUserUpdateLoading);

  if (!user) {
    return <Navigate to={appRoutes.notFound} />;
  }

  const handleSubmit = async (state: UserMutation) => {
    if (user) {
      await dispatch(updateUser({ id: user._id, mutation: state }));
    }
  };

  let form;
  if (user) {
    const mutation: UserMutation = {
      ...user,
      position: user.position._id,
      photo: null,
    };
    form = (
      <StaffForm
        isGoogleUser={isGoogleUser}
        onSubmit={handleSubmit}
        existingUser={mutation}
        open={open}
        onClose={onClose}
        loading={updating}
        existingImage={user.photo}
        isEdit
      />
    );
  }

  return <>{form}</>;
};

export default UserUpdate;
