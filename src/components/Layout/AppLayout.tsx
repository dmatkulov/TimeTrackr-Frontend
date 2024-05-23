import React from 'react';
import AppBar from '../UI/AppBar/AppBar';

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppBar />
      {children}
    </>
  );
};

export default AppLayout;
