import React from 'react';
import { Avatar } from 'antd';
import { apiURL } from '../../../common/constants';

interface Props {
  image: string | null;
  firstname: string | null;
  lastname: string | null;
}

const UserAvatar: React.FC<Props> = ({ image, firstname, lastname }) => {
  return firstname && image ? (
    <Avatar src={apiURL + '/' + image} alt={firstname} size={32} />
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
