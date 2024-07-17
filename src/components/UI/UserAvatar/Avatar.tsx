import React from 'react';
import { Author, StaffData, User } from '../../../types/types.user';
import { Avatar } from 'antd';
import { getPhotoUrl } from '../../../services/photoURL.service';

interface Props {
  user: User | Author | StaffData;
  isCard?: boolean;
}

const AvatarPic: React.FC<Props> = ({ user, isCard = false }) => {
  const photo = getPhotoUrl(user);

  return user.photo ? (
    <Avatar
      src={photo}
      alt={user.firstname}
      size={isCard ? 'small' : 'default'}
    />
  ) : (
    <Avatar
      style={{ backgroundColor: '#f56a00' }}
      size={isCard ? 'small' : 'default'}
    >
      {user.firstname.charAt(0)}
    </Avatar>
  );
};

export default AvatarPic;
