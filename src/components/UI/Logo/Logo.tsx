import React from 'react';
import { appRoutes } from '../../../services/routes.service';
import { Flex, Typography } from 'antd';
import logo from '../../../assets/logo/TT-logo.svg';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

const Logo: React.FC = () => {
  const { md } = useBreakpoint();
  return (
    <Flex align="center" justify="flex-start">
      {md && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 4px',
            marginInline: '4px',
          }}
        >
          <img
            src={logo}
            alt="Time Tracker"
            style={{ height: '30px', width: '30px' }}
          />
        </div>
      )}
      <Typography.Link
        href={appRoutes.home}
        style={{
          color: '#172C3F',
          fontSize: '18px',
          fontWeight: '900',
          textWrap: 'nowrap',
        }}
      >
        Time Trackr
      </Typography.Link>
    </Flex>
  );
};

export default Logo;
