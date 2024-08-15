import React from 'react';
import { Author, StaffData, User } from '../../../types/types.user';
import { Avatar } from 'antd';
import { getPhotoUrl } from '../../../utils/photoURL';

interface Props {
  user: User | Author | StaffData;
  isCard?: boolean;
}

const AvatarPic: React.FC<Props> = ({ user, isCard = false }) => {
  const photo = getPhotoUrl(user);

  return user.photo ? (
    <Avatar src={photo} alt={user.firstname} size={32} />
  ) : (
    <Avatar
      style={{ backgroundColor: '#f56a00', width: '32px', height: '32px' }}
      size={isCard ? 'small' : 32}
    >
      {user.firstname.charAt(0)}
    </Avatar>
  );
};

export default AvatarPic;
