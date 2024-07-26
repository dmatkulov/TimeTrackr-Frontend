import React from 'react';
import { Flex, Typography } from 'antd';
import { User } from '../../../types/types.user';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import AvatarPic from '../UserAvatar/Avatar';

const { Text } = Typography;

interface Props {
  user: User;
}

const UserTitle: React.FC<Props> = ({ user }) => {
  const { md } = useBreakpoint();

  return (
    <Flex align="center" justify={!md ? 'flex-start' : 'flex-end'} gap={10}>
      <div
        style={{
          order: !md ? 1 : 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: !md ? 'flex-start' : 'flex-end',
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>
          {user.firstname + ' ' + user.lastname}
        </Text>
        <Text style={{ fontSize: '12px', color: 'gray' }}>
          {user.position.name}
        </Text>
      </div>
      {<AvatarPic user={user} />}
    </Flex>
  );
};

export default UserTitle;
