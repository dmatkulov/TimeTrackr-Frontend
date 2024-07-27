import React from 'react';
import { appRoutes } from '../../../services/routes.service';
import { Flex, Typography } from 'antd';
import logo from '../../../assets/logo/TT-logo.svg';

interface Props {
  isVisible?: boolean;
}

const Logo: React.FC<Props> = ({ isVisible = true }) => {
  return (
    <Flex align="center" justify="flex-start">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 4px',
          marginInline: '4px',
        }}
      >
        <img src={logo} alt="Time Tracker" style={{ width: '30px' }} />
      </div>
      {isVisible && (
        <Typography.Link
          href={appRoutes.home}
          style={{
            color: '#172C3F',
            fontSize: '26px',
            fontWeight: '900',
            marginTop: '11px',
          }}
        >
          Time Trackr
        </Typography.Link>
      )}
    </Flex>
  );
};

export default Logo;
