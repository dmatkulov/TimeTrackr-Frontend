import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectFetchAllLoading, selectStaff } from '../UsersSlice';
import Spinner from '../../../components/UI/Spin/Spin';
import {
  Avatar,
  Button,
  Flex,
  Space,
  Table,
  TableProps,
  Tag,
  Typography,
} from 'antd';
import { FieldTimeOutlined, UserOutlined } from '@ant-design/icons';
import { StaffData } from '../../../types/types.user';
import { apiURL } from '../../../utils/constants';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import StaffFilterItem from './components/StaffFilterItem';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../../utils/routes';

const StaffTable: React.FC = () => {
  const navigate = useNavigate();
  const staff = useAppSelector(selectStaff);
  const fetchLoading = useAppSelector(selectFetchAllLoading);

  const { xs, sm, md, lg } = useBreakpoint();

  const columns: TableProps<StaffData>['columns'] = [
    {
      dataIndex: 'photo',
      key: 'photo',
      width: '40px',
      responsive: ['lg'],
      render: (_, user) => {
        let avatar;

        if (user.photo) {
          avatar = <Avatar src={apiURL + '/' + user.photo} />;
        } else {
          avatar = (
            <Avatar>
              {user.firstname.charAt(0)}
              {user.lastname.charAt(0)}
            </Avatar>
          );
        }
        return avatar;
      },
    },
    {
      title: 'ФИО',
      dataIndex: 'firstname',
      key: 'firstname',
      width: !lg ? '100%' : '20%',
      render: (_, user) => (
        <>
          <Space size="middle">
            <Typography.Text>
              {user.firstname} {user.lastname}
            </Typography.Text>
            {sm && !md && (
              <Tag bordered={false} color={user.position.tag}>
                {user.position.name}
              </Tag>
            )}
          </Space>
        </>
      ),
    },
    {
      title: 'Позиция',
      key: 'position',
      dataIndex: 'position',
      responsive: ['md'],
      render: (_, { position }) => (
        <Tag bordered={false} color={position.tag}>
          {position.name}
        </Tag>
      ),
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'email',
      responsive: ['xl'],
      render: (_, user) => (
        <Typography.Link href={'mailto:' + user.email}>
          {user.email}
        </Typography.Link>
      ),
    },
    {
      dataIndex: 'action',
      key: 'action',
      render: (_, user) => (
        <Flex align="center" justify="flex-end" gap={12} wrap={!sm}>
          <Button
            size={!lg ? 'small' : 'middle'}
            shape="round"
            type="primary"
            icon={<FieldTimeOutlined />}
            style={{ width: '100%' }}
          >
            {(xs && !sm) || lg ? 'Статистика' : ''}
          </Button>
          <Button
            size={!lg ? 'small' : 'middle'}
            shape="round"
            icon={<UserOutlined />}
            style={{ width: '100%' }}
            onClick={() =>
              navigate(appRoutes.admin.staff + '/profile/' + user._id)
            }
          >
            {(xs && !sm) || lg ? 'Профиль' : ''}
          </Button>
        </Flex>
      ),
    },
  ];

  const dataSource = staff.map((user) => ({
    ...user,
    key: user._id,
  }));

  return (
    <>
      <StaffFilterItem loading={fetchLoading} />
      {fetchLoading ? (
        <Spinner />
      ) : (
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 10, position: ['topRight', 'bottomRight'] }}
        />
      )}
    </>
  );
};

export default StaffTable;
