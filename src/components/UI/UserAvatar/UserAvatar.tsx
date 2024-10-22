import React from 'react';
import { Avatar } from 'antd';
import { getPhotoUrl } from '../../../utils/photoURL';

interface Props {
  image: string | null;
  firstname: string | null;
  lastname: string | null;
}

const UserAvatar: React.FC<Props> = ({ image, firstname, lastname }) => {
  const photo = getPhotoUrl(image);
  return firstname && image ? (
    <Avatar src={photo} alt={firstname} size={32} />
  ) : (
    <Avatar
      style={{
        backgroundColor: '#f56a00',
        width: '32px',
        height: '32px',
        fontSize: '14px',
      }}
      size={32}
    >
      {firstname?.charAt(0)}
      {lastname?.charAt(0)}
    </Avatar>
  );
};

export default UserAvatar;
