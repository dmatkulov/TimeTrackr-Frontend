import React from 'react';
import { Button, Layout, Space, theme } from 'antd';
import Logo from '../UI/AppBar/Logo';
import { AppstoreOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

const { Header } = Layout;

interface AppHeaderProps extends React.PropsWithChildren {
  toggleMenu?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ toggleMenu, children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { md } = useBreakpoint();

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
        }}
      >
        <Space
          align="center"
          size="middle"
          style={{ paddingLeft: !md ? '0' : '6px' }}
        >
          {md && <Button icon={<AppstoreOutlined />} onClick={toggleMenu} />}
          <Logo />
        </Space>
        {children}
      </Header>
    </>
  );
};

export default AppHeader;
