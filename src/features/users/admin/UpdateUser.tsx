import React from 'react';
import UserForm from '../components/UserForm';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectEmployee, selectUserUpdateLoading } from '../UsersSlice';
import dayjs from 'dayjs';
import { UserMutation } from '../../../types/types.user';
import { updateUser } from '../UsersThunks';

interface Props {
  open: boolean;
  onClose: () => void;
}

const UpdateUser: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectEmployee);
  const updating = useAppSelector(selectUserUpdateLoading);

  const handleSubmit = async (state: UserMutation) => {
    if (user) {
      await dispatch(updateUser({ id: user._id, mutation: state }));
    }
    console.log(state);
  };

  let form;
  if (user) {
    const startDate = dayjs(user.startDate).format('YYYY-MM-DD');

    const mutation: UserMutation = {
      ...user,
      position: user.position._id,
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
        existingImage={user.photo}
        isEdit
      />
    );
  }

  return <>{form}</>;
};

export default UpdateUser;
