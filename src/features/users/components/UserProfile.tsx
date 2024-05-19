import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import {
  Button,
  Col,
  Divider,
  Flex,
  Image,
  Popconfirm,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import { User } from '../../../types/types.user';
import noPhoto from '../../../assets/no-photo.png';
import { apiURL } from '../../../utils/constants';
import {
  DeleteOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { formatPhoneNumber } from '../../../utils/helpers';
import { deleteUser } from '../UsersThunks';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../../utils/routes';
import { selectDeleteUserLoading } from '../UsersSlice';
import UpdateUser from '../admin/UpdateUser';

dayjs.locale('ru');

const { Title, Text } = Typography;

interface Props {
  employee: User;
}
const UserProfile: React.FC<Props> = ({ employee }) => {
  const dispatch = useAppDispatch();
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

  let photo = noPhoto;
  if (employee.photo) {
    photo = apiURL + '/' + employee.photo;
  }

  const startDate = dayjs(employee.startDate).format('DD MMMM, YYYY');

  const phone = formatPhoneNumber(employee.contactInfo.mobile);

  const handleDelete = useCallback(
    async (id: string) => {
      await dispatch(deleteUser(id)).unwrap();
      navigate(appRoutes.admin.staff);
    },
    [dispatch],
  );

  return (
    <>
      <Row gutter={44} style={{ paddingTop: 20 }}>
        <Col>
          <Image
            width={200}
            src={photo}
            alt={employee.lastname}
            style={{ borderRadius: 12, marginBottom: 30 }}
          />
        </Col>
        <Col>
          <Title style={{ margin: '0 0 25px 0' }} level={3}>
            {employee.lastname} {employee.firstname}
          </Title>
          <Flex vertical align="flex-start" gap={12}>
            <Tag color={employee.position.tag}>{employee.position.name}</Tag>
            <Space>
              <Text style={{ fontWeight: 'bolder' }}>Начало работы: </Text>
              <Text>{startDate}</Text>
            </Space>
          </Flex>
          <Divider dashed />
          <Flex
            vertical
            align="flex-start"
            gap={12}
            style={{ marginBottom: 30 }}
          >
            <Text style={{ fontWeight: 'bolder' }}>Контакты</Text>
            <Flex align="center" gap={!lg ? 12 : 20} wrap={true}>
              <Space>
                <PhoneOutlined />
                <Text>{phone}</Text>
              </Space>
              <Space>
                <MailOutlined />
                <Text>{employee.email}</Text>
              </Space>
              <Space>
                <PhoneOutlined />
                <Text>
                  г. {employee.contactInfo.city}, ул.{' '}
                  {employee.contactInfo.street}
                </Text>
              </Space>
            </Flex>
          </Flex>
          <Flex align="flex-start" gap={20} wrap={true}>
            <Button
              style={{ width: !sm ? '280px' : 'auto' }}
              size="middle"
              shape="round"
              icon={<EditOutlined />}
              onClick={handleOpen}
            >
              Редактировать
            </Button>
            <Popconfirm
              title="Удаление сотрудника"
              description="Вы уверены, что хотите удалить сотрудника?"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              okText="Удалить"
              cancelText="Отменить"
              disabled={deleteLoading}
              onConfirm={() => handleDelete(employee._id)}
            >
              <Button
                style={{ width: !sm ? '280px' : 'auto' }}
                shape="round"
                size="middle"
                danger
                icon={<DeleteOutlined />}
              >
                Удалить сотрудника
              </Button>
            </Popconfirm>
          </Flex>
        </Col>
      </Row>
      <UpdateUser open={open} onClose={handleClose} />
    </>
  );
};

export default UserProfile;
