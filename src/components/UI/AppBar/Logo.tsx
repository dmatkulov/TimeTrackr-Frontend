import React from 'react';
import { appRoutes } from '../../../utils/routes';
import { blue } from '@ant-design/colors';
import { Typography } from 'antd';
const { Link } = Typography;

const Logo: React.FC = () => {
  return (
    <div style={{ width: '280px' }}>
      <Link
        href={appRoutes.home}
        style={{
          color: blue.primary,
          margin: 0,
          fontSize: '20px',
          fontWeight: '600',
        }}
      >
        Time Trackr
      </Link>
    </div>
  );
};

export default Logo;
