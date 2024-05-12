import React from 'react';
import { appRoutes } from '../../../utils/routes';
import { blue } from '@ant-design/colors';
import { Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
const { Link } = Typography;

const Logo: React.FC = () => {
  const screens = useBreakpoint();
  const sm = !screens.md;
  return (
    <div style={{ width: '280px', display: sm ? 'none' : 'block' }}>
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
