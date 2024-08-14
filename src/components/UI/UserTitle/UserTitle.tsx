import React, { CSSProperties } from 'react';
import { Badge, Dropdown, Flex, MenuProps, Space, Typography } from 'antd';
import { User } from '../../../types/types.user';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import AvatarPic from '../UserAvatar/Avatar';
import { useAppDispatch } from '../../../store/hooks/hooks';
import { logOut } from '../../../store/users/UsersThunks';
import { appRoutes } from '../../../services/routes.service';
import { useNavigate } from 'react-router-dom';
import { BellFilled, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import './index.css';

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
    padding: '10px',
    border: '1px solid rgba(5, 5, 5, 0.03)',
  };

  const iconStyle: CSSProperties = {
    background: '#F5F5F5',
    padding: '5px',
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
      style: {
        ...listStyle,
        gridColumnStart: 1,
        gridColumnEnd: 3,
        gridRowStart: 1,
        gridRowEnd: 3,
      },
    },
    {
      key: 'profile',
      label: (
        <Flex align="center" justify="space-between">
          <Space>
            <div style={iconStyle}>
              <UserOutlined />
            </div>
            Профиль
          </Space>
        </Flex>
      ),
      onClick: () => navigate(appRoutes.user.account),
      style: listStyle,
    },
    {
      key: 'exit',
      danger: true,
      label: (
        <Flex align="center" justify="space-between">
          <Space>
            <div style={{ ...iconStyle, background: 'none' }}>
              <LogoutOutlined />
            </div>
            Выйти
          </Space>
        </Flex>
      ),
      onClick: logOutUser,
      style: {
        ...listStyle,
        borderColor: '#fff2f2',
      },
    },
  ];

  return (
    <Flex
      className="user-title"
      align="center"
      justify={!md ? 'flex-start' : 'flex-end'}
      gap={10}
    >
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
      <Dropdown
        overlayStyle={{ top: '80px' }}
        overlayClassName="styled-dropdown"
        menu={{ items }}
        placement="bottomRight"
        arrow
      >
        <div>
          <AvatarPic user={user} />
        </div>
      </Dropdown>
    </Flex>
  );
};

export default UserTitle;
