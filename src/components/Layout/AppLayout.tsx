import React from 'react';
import AppBar from '../UI/AppBar/AppBar';
import { Outlet } from 'react-router-dom';

interface Props extends React.PropsWithChildren {}
const AppLayout: React.FC<Props> = () => {
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
};

export default AppLayout;
