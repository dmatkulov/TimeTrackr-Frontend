import { Button, Drawer } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import EmployeeMenu from '../../../features/users/employee/components/EmployeeMenu';
import { User } from '../../../types/types.user';
import UserAvatar from './UserAvatar';

interface Props {
  user: User;
}
const UserDrawer: React.FC<Props> = ({ user }) => {
  const [open, setOpen] = useState(false);

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
        <EmployeeMenu />
      </Drawer>
    </>
  );
};

export default UserDrawer;
