import React from 'react';
import { Button, Col, Layout, Row, theme, Typography } from 'antd';
import { blue } from '@ant-design/colors';
import { appRoutes } from '../../../utils/routes';
import { selectUser } from '../../../features/users/UsersSlice';
import { useAppSelector } from '../../../app/hooks';
import AnonymousMenu from './AnonymousMenu';
import UserMenu from './UserMenu';

const { Header } = Layout;
const { Link } = Typography;

const AppBar: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const user = useAppSelector(selectUser);

  return (
    <>
      <Header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          padding: '0 24px',
          // display: 'flex',
          // flexDirection: 'row',
          // justifyContent: 'space-between',
          // alignItems: 'center',
          background: colorBgContainer,
          borderBottom: '1px solid #ececec',
        }}
      >
        <Row>
          <Col span={8} style={{ marginRight: '20px' }}>
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
          </Col>
          <Col
            style={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: 1,
              justifyContent: 'space-between',
            }}
          >
            <Button>Add user</Button>
            {user ? <UserMenu user={user} /> : <AnonymousMenu />}
          </Col>
        </Row>
      </Header>
    </>
  );
};

export default AppBar;
