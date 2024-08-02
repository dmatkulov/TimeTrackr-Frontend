import { Button, Drawer } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import UserMenu from '../../UserMenu/UserMenu';
import { User } from '../../../types/types.user';
import UserTitle from '../UserTitle/UserTitle';

interface Props {
  user: User;
}

const MobileMenu: React.FC<Props> = ({ user }) => {
  const [open, setOpen] = useState(false);

  // const isAdmin = user.role === 'admin';
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button icon={<AppstoreOutlined />} onClick={handleOpen} />

      <Drawer
        title="Time Trackr"
        onClose={handleClose}
        open={open}
        styles={{ body: { display: 'flex', flexDirection: 'column' } }}
      >
        <div style={{ marginBottom: '30px', paddingLeft: 20 }}>
          <UserTitle user={user} />
        </div>
        <UserMenu handleMobile={handleClose} />
      </Drawer>
    </>
  );
};

export default MobileMenu;
