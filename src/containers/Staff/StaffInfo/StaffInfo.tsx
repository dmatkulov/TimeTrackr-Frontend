// import React, { useEffect } from 'react';
// import Profile from '../../components/Profile/Profile';
// import { useParams } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
// import {
//   selectEmployee,
//   selectFetchOneLoading,
// } from '../../store/utils/users/UsersSlice';
// import { getOneUser } from '../../store/utils/users/UsersThunks';
// import Spinner from '../../components/UI/Spin/Spin';
// import { Breadcrumb } from 'antd';
// import { appRoutes } from '../routes.service';
//
// const StaffInfo: React.FC = () => {
//   const { id } = useParams() as { id: string };
//   const dispatch = useAppDispatch();
//   const employee = useAppSelector(selectEmployee);
//   const loading = useAppSelector(selectFetchOneLoading);
//
//   useEffect(() => {
//     dispatch(getOneUser(id));
//   }, [dispatch]);
//
//   return (
//     <>
//       <Breadcrumb
//         style={{ marginBottom: '20px' }}
//         items={[
//           {
//             title: <a href={appRoutes.admin.staff}>Все сотрудники</a>,
//           },
//           {
//             title: 'Профиль',
//           },
//         ]}
//       />
//       {employee && (
//         <>{loading ? <Spinner /> : <Profile user={employee} />}</>
//       )}
//     </>
//   );
// };
//
// export default StaffInfo;
