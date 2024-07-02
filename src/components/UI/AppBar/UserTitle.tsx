import React from 'react';
import { Flex, Typography } from 'antd';
import { User } from '../../../types/types.user';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { green } from '@ant-design/colors';
import AvatarPic from '../../UserAvatar/Avatar';

const { Text } = Typography;

interface Props {
  user: User;
}

const UserTitle: React.FC<Props> = ({ user }) => {
  const { sm, lg, md } = useBreakpoint();

  return (
    <Flex align="center" justify={!md ? 'flex-start' : 'flex-end'} gap={10}>
      <Text style={{ order: !md ? 1 : 0, color: green.primary }}>
        {sm && !lg ? 'Мой кабинет' : user.firstname + ' ' + user.lastname}
      </Text>
      {<AvatarPic user={user} />}
    </Flex>
  );
};

export default UserTitle;
