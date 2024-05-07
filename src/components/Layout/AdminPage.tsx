import AdminMenu from '../UI/Menu/AdminMenu';
import { Outlet } from 'react-router-dom';
import { Col, Row } from 'antd';
import React from 'react';

const AdminPage: React.FC = () => {
  return (
    <>
      <Row>
        <Col
          span={6}
          style={{
            overflow: 'auto',
            height: '100vh',
            left: 0,
            top: 0,
            bottom: 0,
            background: '#fff',
          }}
        >
          <div className="demo-logo-vertical">Time Trackr</div>
          <AdminMenu />
        </Col>
        <Col span={18}>
          <header>This is admin header</header>
          <main>
            <Outlet />
          </main>
          <footer>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </footer>
        </Col>
      </Row>
    </>
  );
};

export default AdminPage;
