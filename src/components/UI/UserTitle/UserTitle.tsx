import React, { CSSProperties } from 'react';
import { Badge, Dropdown, Flex, MenuProps, Space, Typography } from 'antd';
import { User } from '../../../types/types.user';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import AvatarPic from '../UserAvatar/Avatar';
import { useAppDispatch } from '../../../store/hooks/hooks';
import { logOut } from '../../../store/users/UsersThunks';
import { appRoutes } from '../../../services/routes.service';
import { useNavigate } from 'react-router-dom';
import { BellFilled } from '@ant-design/icons';

const { Text } = Typography;

interface Props {
  user: User;
}

const UserTitle: React.FC<Props> = ({ user }) => {
  const { md, lg } = useBreakpoint();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOutUser = async () => {
    await dispatch(logOut());
    navigate(appRoutes.auth);
  };

  const listStyle: CSSProperties = {
    width: '260px',
    padding: '10px',
  };

  const iconStyle: CSSProperties = {
    background: '#F5F5F5',
    padding: '10px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const items: MenuProps['items'] = [
    {
      key: 'notifications',
      label: (
        <Flex align="center" justify="space-between">
          <Space>
            <div style={iconStyle}>
              <BellFilled />
            </div>
            <Text style={{ flexGrow: 1 }}>Уведомления</Text>
          </Space>
          <Badge count={5} style={{ backgroundColor: '#52c41a' }} />
        </Flex>
      ),
      style: listStyle,
    },
    {
      key: 'dashboard',
      label: (
        <Flex align="center" justify="space-between">
          <Space>
            <div style={iconStyle}>
              <BellFilled />
            </div>
            <Text style={{ flexGrow: 1 }}>Дашбоард</Text>
          </Space>
          <Badge count={5} style={{ backgroundColor: '#52c41a' }} />
        </Flex>
      ),
      onClick: () => navigate(appRoutes.employee.dashboard),
      style: listStyle,
    },
    {
      key: 'profile',
      label: (
        <Flex align="center" justify="space-between">
          <Space>
            <div style={iconStyle}>
              <BellFilled />
            </div>
            <Text style={{ flexGrow: 1 }}>Профиль</Text>
          </Space>
          <Badge count={5} style={{ backgroundColor: '#52c41a' }} />
        </Flex>
      ),
      onClick: () => navigate(appRoutes.employee.account),
      style: listStyle,
    },
    {
      type: 'divider',
    },
    {
      key: 'exit',
      danger: true,
      label: (
        <Flex align="center" justify="space-between">
          <Space>
            <div style={iconStyle}>
              <BellFilled />
            </div>
            <Text style={{ flexGrow: 1 }}>Выйти</Text>
          </Space>
          <Badge count={5} style={{ backgroundColor: '#52c41a' }} />
        </Flex>
      ),
      onClick: logOutUser,
      style: listStyle,
    },
  ];

  return (
    <Flex align="center" justify={!md ? 'flex-start' : 'flex-end'} gap={10}>
      <div
        style={{
          display: !lg ? 'block' : 'flex',
          flexDirection: 'column',
          alignItems: !md ? 'flex-start' : 'flex-end',
          flexWrap: 'nowrap',
        }}
      >
        {!lg ? (
          <></>
        ) : (
          <>
            <Text style={{ fontWeight: 'bold' }}>
              {user.firstname + ' ' + user.lastname}
            </Text>
            <Text style={{ fontSize: '12px', color: 'gray' }}>
              {user.position.name}
            </Text>
          </>
        )}
      </div>
      <Dropdown menu={{ items }} placement="bottomRight" arrow>
        <div>
          <AvatarPic user={user} />
        </div>
      </Dropdown>
    </Flex>
  );
};

export default UserTitle;
