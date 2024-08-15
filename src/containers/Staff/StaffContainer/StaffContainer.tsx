import React from 'react';
import { Outlet } from 'react-router-dom';

interface Props extends React.PropsWithChildren {}
const StaffContainer: React.FC<Props> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default StaffContainer;
