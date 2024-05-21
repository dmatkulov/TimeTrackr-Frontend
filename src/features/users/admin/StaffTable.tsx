import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectFetchAllLoading, selectStaff } from '../UsersSlice';
import Spinner from '../../../components/UI/Spin/Spin';
import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  MenuProps,
  Space,
  Table,
  TableProps,
  Tag,
  Typography,
} from 'antd';
import {
  FieldTimeOutlined,
  MoreOutlined,
  UserOutlined,
} from '@ant-design/icons';
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

  const { sm, lg } = useBreakpoint();

  const items: MenuProps['items'] = [
    {
      label: 'Статистика',
      key: 'stats',
      icon: <FieldTimeOutlined />,
    },
    {
      label: 'Профиль',
      key: 'profile',
      icon: <UserOutlined />,
    },
  ];

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
          <Flex align="center" justify="space-between">
            <Space size="middle">
              <Typography.Text>
                {user.firstname} {user.lastname}
              </Typography.Text>
              {sm && !lg && (
                <Tag
                  bordered={false}
                  color={user.position.tag}
                  style={{ flexGrow: 1 }}
                >
                  {user.position.name}
                </Tag>
              )}
            </Space>
            {!lg && (
              <Dropdown
                menu={{
                  items,
                  onClick: ({ key }) => {
                    if (key === 'stats') {
                      navigate(appRoutes.admin.stats);
                    }
                    if (key === 'profile') {
                      navigate(appRoutes.admin.staff + '/profile/' + user._id);
                    }
                  },
                }}
                placement="bottomRight"
              >
                <Button
                  shape="circle"
                  size="small"
                  style={{ marginLeft: 'auto' }}
                  icon={<MoreOutlined />}
                />
              </Dropdown>
            )}
          </Flex>
        </>
      ),
    },
    {
      title: 'Позиция',
      key: 'position',
      dataIndex: 'position',
      responsive: ['lg'],
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
      render: (_, user) => <Typography.Text>{user.email}</Typography.Text>,
    },
    {
      dataIndex: 'action',
      key: 'action',
      responsive: ['lg'],
      render: (_, user) => (
        <Flex align="center" justify="flex-end" gap={10}>
          <Button
            size="small"
            shape="round"
            type="link"
            icon={<FieldTimeOutlined />}
            style={{
              fontSize: '12px',
            }}
          >
            Статистика
          </Button>
          <Button
            size="small"
            type="link"
            shape="round"
            icon={<UserOutlined />}
            style={{ fontSize: '12px' }}
            onClick={() =>
              navigate(appRoutes.admin.staff + '/profile/' + user._id)
            }
          >
            Профиль
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
