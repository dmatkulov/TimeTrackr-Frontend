import React from 'react';
import UserForm from '../components/UserForm';
import { useAppSelector } from '../../../app/hooks';
import { selectEmployee, selectUserUpdateLoading } from '../UsersSlice';
import dayjs from 'dayjs';
import { UserMutation } from '../../../types/types.user';

interface Props {
  open: boolean;
  onClose: () => void;
}

const UpdateUser: React.FC<Props> = ({ open, onClose }) => {
  const user = useAppSelector(selectEmployee);
  const updating = useAppSelector(selectUserUpdateLoading);

  let form;
  if (user) {
    const startDate = dayjs(user.startDate).format('YYYY-MM-DD');

    const mutation: UserMutation = {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      contactInfo: user.contactInfo,
      photo: user.photo,
      position: user.position._id,
      startDate: startDate,
    };
    form = (
      <UserForm
        existingUser={mutation}
        open={open}
        onClose={onClose}
        loading={updating}
        isEdit
      />
    );
  }

  return <>{form}</>;
};

export default UpdateUser;
