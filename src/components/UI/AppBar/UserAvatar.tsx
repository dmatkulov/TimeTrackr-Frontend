import React from 'react';
import { Avatar, Flex, Typography } from 'antd';
import { User } from '../../../types/types.user';
import { apiURL } from '../../../utils/constants';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { green } from '@ant-design/colors';

const { Text } = Typography;

interface Props {
  user: User;
}
const UserAvatar: React.FC<Props> = ({ user }) => {
  const { sm, lg, md } = useBreakpoint();
  const src = `${apiURL}/${user.photo}`;

  return (
    <Flex align="center" justify={!md ? 'flex-start' : 'flex-end'} gap={10}>
      <Text style={{ order: !md ? 1 : 0, color: green.primary }}>
        {sm && !lg ? 'Мой кабинет' : user.firstname + ' ' + user.lastname}
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
