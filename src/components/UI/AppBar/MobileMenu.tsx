import { Button, Drawer } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import EmployeeMenu from '../../../features/users/components/EmployeeMenu';
import { User } from '../../../types/types.user';
import UserAvatar from './UserAvatar';
import AdminMenu from '../../../features/users/components/AdminMenu';

interface Props {
  user: User;
}

const MobileMenu: React.FC<Props> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const isAdmin = user.role === 'admin';
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button icon={<MenuFoldOutlined />} onClick={handleOpen} />

      <Drawer
        title="Time Trackr"
        onClose={handleClose}
        open={open}
        styles={{ body: { display: 'flex', flexDirection: 'column' } }}
      >
        <div style={{ marginBottom: '30px', paddingLeft: 20 }}>
          <UserAvatar user={user} />
        </div>

        {isAdmin ? (
          <AdminMenu handleMobile={handleClose} />
        ) : (
          <EmployeeMenu handleMobile={handleClose} />
        )}
      </Drawer>
    </>
  );
};

export default MobileMenu;
