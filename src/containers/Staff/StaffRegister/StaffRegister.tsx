// import React from 'react';
// import ProfileForm from '../../components/ProfileForm/ProfileForm';
// import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
// import { selectRegisterLoading } from '../../store/utils/users/UsersSlice';
// import { UserMutation } from '../../types/types.user';
// import { getUsers, register } from '../../store/utils/users/UsersThunks';
//
// interface Props {
//   open: boolean;
//   onClose: () => void;
// }
//
// const StaffRegister: React.FC<Props> = ({ open, onClose }) => {
//   const creating = useAppSelector(selectRegisterLoading);
//   const dispatch = useAppDispatch();
//
//   const handleFormSubmit = async (state: UserMutation) => {
//     await dispatch(register(state)).unwrap();
//     await dispatch(getUsers());
//   };
//
//   return (
//     <>
//       <ProfileForm
//         onSubmit={handleFormSubmit}
//         open={open}
//         onClose={onClose}
//         loading={creating}
//       />
//     </>
//   );
// };
//
// export default StaffRegister;
