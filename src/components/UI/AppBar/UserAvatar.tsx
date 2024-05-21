import React from 'react';
import { Avatar, Flex, Typography } from 'antd';
import { User } from '../../../types/types.user';
import { apiURL } from '../../../utils/constants';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

const { Text } = Typography;

interface Props {
  user: User;
}
const UserAvatar: React.FC<Props> = ({ user }) => {
  const { sm, md } = useBreakpoint();
  const src = `${apiURL}/${user.photo}`;

  return (
    <Flex align="center" justify={!sm ? 'flex-start' : 'flex-end'} gap={10}>
      <Text style={{ order: !sm ? 1 : 0 }}>
        {sm && !md ? 'Мой кабинет' : user.firstname + ' ' + user.lastname}
      </Text>
      {user.photo ? (
        <Avatar src={src} alt={user.firstname} />
      ) : (
        <Avatar style={{ backgroundColor: '#f56a00' }}>
          {user.firstname.charAt(0)}
        </Avatar>
      )}
    </Flex>
  );
};

export default UserAvatar;
