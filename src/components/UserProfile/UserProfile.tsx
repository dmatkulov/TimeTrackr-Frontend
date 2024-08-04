import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { Button, Flex, Popconfirm, Space, Tag, Typography } from 'antd';
import { User } from '../../types/types.user';
import {
  CameraFilled,
  DeleteOutlined,
  MailOutlined,
  PhoneOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { formatPhoneNumber } from '../../services/formatPhoneNumber.service';
import { deleteUser } from '../../store/users/UsersThunks';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../services/routes.service';
import {
  selectDeleteUserLoading,
  selectUser,
} from '../../store/users/UsersSlice';
import UserUpdate from '../../containers/UserUpdate/UserUpdate';
import { getPhotoUrl } from '../../services/photoURL.service';
import { Roles } from '../../enum/roles.enum';

dayjs.locale('ru');

const { Title, Text } = Typography;

interface Props {
  user: User;
}

const UserProfile: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);
  const navigate = useNavigate();
  const deleteLoading = useAppSelector(selectDeleteUserLoading);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const { sm, lg } = useBreakpoint();

  const photo = getPhotoUrl(user);

  let phone;
  if (user.phoneNumber) {
    phone = formatPhoneNumber(user.phoneNumber);
  }

  const handleDelete = useCallback(
    async (id: string) => {
      await dispatch(deleteUser(id)).unwrap();
      navigate(appRoutes.admin.staff);
    },
    [dispatch],
  );

  console.log(user);

  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexDirection: !sm ? 'column' : 'row',
          alignItems: 'stretch',
          marginTop: '30px',
        }}
      >
        <div
          style={{
            borderRadius: 20,
            background: '#fff',
            padding: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '100%',
              gap: 10,
            }}
          >
            <div
              style={{
                width: '150px',
                height: '150px',
                overflow: 'hidden',
              }}
            >
              <img
                src={photo}
                alt={user.lastname}
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
            </div>
            <Button type="primary" icon={<CameraFilled />}>
              Новое фото
            </Button>
          </div>
        </div>
        <div
          style={{
            borderRadius: 20,
            background: '#fff',
            padding: '20px 30px',
          }}
        >
          <Title style={{ margin: '0 0 15px 0' }} level={3}>
            {user.lastname} {user.firstname}
          </Title>
          <Tag color={user.position.tag}>{user.position.name}</Tag>
          <Flex
            vertical
            align="flex-start"
            gap={12}
            style={{ margin: '30px 0' }}
          >
            <Text style={{ fontWeight: 'bolder' }}>Контакты</Text>
            <Flex align="center" gap={!lg ? 12 : 20} wrap={true}>
              <Space>
                <MailOutlined />
                <Text>{user.email}</Text>
              </Space>
              {phone && (
                <Space>
                  <PhoneOutlined />
                  <Text>{phone}</Text>
                </Space>
              )}
            </Flex>
          </Flex>
          <Button onClick={handleOpen}>Редактировать</Button>
        </div>
      </div>

      {currentUser?.role === Roles.Admin && currentUser?._id !== user._id && (
        <Popconfirm
          title="Удаление сотрудника"
          description="Вы уверены, что хотите удалить сотрудника?"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          okText="Удалить"
          cancelText="Отменить"
          disabled={deleteLoading}
          onConfirm={() => handleDelete(user._id)}
        >
          <Button
            style={{ width: !sm ? '280px' : 'auto' }}
            danger
            type="text"
            icon={<DeleteOutlined />}
          >
            Удалить сотрудника
          </Button>
        </Popconfirm>
      )}
      <UserUpdate employee={user} open={open} onClose={handleClose} />
    </>
  );
};

export default UserProfile;
