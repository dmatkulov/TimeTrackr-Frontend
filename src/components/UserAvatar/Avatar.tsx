import React from 'react';
import { Author, User } from '../../types/types.user';
import { getPhotoUrl } from '../../utils/constants';
import { Avatar } from 'antd';

interface Props {
  user: User | Author;
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
