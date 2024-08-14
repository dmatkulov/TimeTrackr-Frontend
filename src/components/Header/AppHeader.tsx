import React from 'react';
import { Layout, theme } from 'antd';

const { Header } = Layout;

interface Props extends React.PropsWithChildren {}

const AppHeader: React.FC<Props> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '20px 20px',
          height: '80px',
          background: colorBgContainer,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
          gap: '40px',
        }}
      >
        {children}
      </Header>
    </>
  );
};

export default AppHeader;
