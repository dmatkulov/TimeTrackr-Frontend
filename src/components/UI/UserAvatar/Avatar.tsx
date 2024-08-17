import React from 'react';
import { Avatar } from 'antd';
import { getPhotoUrl } from '../../../utils/photoURL';

interface Props {
  image: string | null;
  firstname: string | null;
}

const AvatarPic: React.FC<Props> = ({ image, firstname }) => {
  const photo = getPhotoUrl(image);

  return firstname && photo ? (
    <Avatar src={photo} alt={firstname} size={32} />
  ) : (
    <Avatar
      style={{ backgroundColor: '#f56a00', width: '32px', height: '32px' }}
      size={32}
    >
      {firstname?.charAt(0)}
    </Avatar>
  );
};

export default AvatarPic;
