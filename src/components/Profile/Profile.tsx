import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { User, UserMutation, UserPhoto } from '../../types/types.user';
import {
  useGetUserQuery,
  useUpdatePhotoMutation,
  useUpdateUserMutation,
} from '../../store/services/user/user';
import Spinner from '../UI/Spin/Spin';
import { Button, Flex, Form, message, Modal, Space, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { getPhotoUrl } from '../../utils/photoURL';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
import ProfileForm from './ProfileForm/ProfileForm';
import FileInput from '../FormInputGroups/FileInput';
import { CameraFilled, MailOutlined, PhoneOutlined } from '@ant-design/icons';

dayjs.locale('ru');

const { Title, Text } = Typography;

interface Props {
  user: User;
}

const Profile: React.FC<Props> = ({ user }) => {
  const { data: currentUser, isFetching } = useGetUserQuery(user._id);
  const [updateUser, { isLoading: isUpdatingUser, isError: updateUserError }] =
    useUpdateUserMutation();
  const [
    updatePhoto,
    { isLoading: isUpdatingPhoto, isError: updatePhotoError },
  ] = useUpdatePhotoMutation();
  const [form] = Form.useForm();
  const { sm, lg } = useBreakpoint();

  const [state, setState] = useState<UserPhoto>({ photo: null });
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (updateUserError || updatePhotoError) {
      void message.error('Что-то пошло не так!');
    }
  }, [updateUserError, updatePhotoError]);

  const showModal = () => {
    if (currentUser) {
      setState((prevState) => ({ ...prevState, photo: currentUser.photo }));
    }
    setIsModalOpen(true);
  };

  let photo;
  let phone;
  let userForm;
  let modal;

  if (currentUser) {
    photo = getPhotoUrl(currentUser.photo);
  }

  const handleOk = async () => {
    await updatePhoto({ id: user._id, mutation: state }).unwrap();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields;
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = async () => {
    setOpen(true);
  };

  const handleSubmit = async (state: UserMutation) => {
    if (currentUser) {
      await updateUser({ id: currentUser._id, mutation: state }).unwrap();
    }
  };

  const deletePhoto = () => {
    setState((prevState) => ({
      ...prevState,
      photo: 'delete',
    }));
  };

  const fileInputChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = event.target;
    if (files && currentUser) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const selectedFilename = useMemo(() => {
    if (state.photo instanceof File) {
      return state.photo.name;
    } else if (state.photo === 'delete') {
      return undefined;
    } else if (currentUser && currentUser.photo) {
      return currentUser.photo.split('/').pop();
    }
  }, [state.photo, currentUser]);

  if (currentUser) {
    if (currentUser.phoneNumber) {
      phone = formatPhoneNumber(currentUser.phoneNumber);
    }

    const mutation: UserMutation = {
      email: currentUser.email,
      firstname: currentUser.firstname,
      lastname: currentUser.lastname,
      phoneNumber: null,
      photo: null,
    };
    userForm = (
      <ProfileForm
        onSubmit={handleSubmit}
        existingUser={mutation}
        existingImage={currentUser.photo}
        existingPhone={currentUser.phoneNumber}
        open={open}
        onClose={handleClose}
        loading={isUpdatingUser}
        isEdit
      />
    );
    modal = (
      <Modal
        okButtonProps={{ disabled: isUpdatingPhoto }}
        title="Редактировать фото"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        forceRender
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item name="photo">
            <FileInput
              name="photo"
              filename={selectedFilename}
              onChange={fileInputChangeHandler}
              onDelete={deletePhoto}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        currentUser && (
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
                    alt={currentUser.lastname}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%',
                    }}
                  />
                </div>
                <Button
                  type="primary"
                  icon={<CameraFilled />}
                  onClick={showModal}
                >
                  Новое фото
                </Button>
              </div>
            </div>
            <div
              style={{
                borderRadius: 20,
                background: '#fff',
                padding: '20px 30px',
                flexBasis: !sm ? 'auto' : '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Title style={{ margin: '0 0 15px 0' }} level={3}>
                {currentUser.lastname} {currentUser.firstname}
              </Title>
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
                    <Text>{currentUser.email}</Text>
                  </Space>
                  {phone && (
                    <Space>
                      <PhoneOutlined />
                      <Text>{phone}</Text>
                    </Space>
                  )}
                </Flex>
              </Flex>
              <Button style={{ marginTop: 'auto' }} onClick={handleOpen}>
                Редактировать
              </Button>
            </div>
          </div>
        )
      )}

      {userForm}
      {modal}
    </>
  );
};

export default Profile;
