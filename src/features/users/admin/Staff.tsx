import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectFetchAllLoading, selectStaff } from '../UsersSlice';
import Spinner from '../../../components/UI/Spin/Spin';
import {
  Avatar,
  Button,
  Col,
  Row,
  Space,
  Switch,
  Table,
  TableProps,
  Tag,
  Typography,
} from 'antd';
import { DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { StaffData, UserQueryValues } from '../../../types/types.user';
import FilterForm from './components/FilterForm';
import { getUsers } from '../UsersThunks';
import { fetchPositions } from '../../positions/positionsThunks';
import { selectPositions } from '../../positions/positionsSlice';
import { apiURL } from '../../../utils/constants';

const Staff: React.FC = () => {
  const dispatch = useAppDispatch();
  const staff = useAppSelector(selectStaff);
  const positions = useAppSelector(selectPositions);
  const fetchLoading = useAppSelector(selectFetchAllLoading);

  const [isChecked, setIsChecked] = useState(false);

  const fetchOnInitOrReset = useCallback(async () => {
    await dispatch(getUsers());
    await dispatch(fetchPositions());
  }, [dispatch]);

  const fetchAllStaff = useCallback(async () => {
    await dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    void fetchOnInitOrReset();
  }, [fetchOnInitOrReset]);

  const handleFormSubmit = async (state: UserQueryValues) => {
    await dispatch(getUsers(state));
  };

  const onChange = (checked: boolean) => {
    setIsChecked(checked);
    if (!checked) {
      void fetchAllStaff();
    }
  };

  const columns: TableProps<StaffData>['columns'] = [
    {
      dataIndex: 'photo',
      key: 'photo',
      width: '40px',
      render: (_, user) => {
        let avatar;

        if (user.photo) {
          avatar = <Avatar src={apiURL + '/' + user.photo} />;
        } else {
          avatar = (
            <Avatar icon={<UserOutlined />}>{user.firstname.charAt(0)}</Avatar>
          );
        }
        return avatar;
      },
    },
    {
      title: 'ФИО',
      dataIndex: 'firstname',
      key: 'firstname',
      render: (_, user) => (
        <Typography.Text>
          {user.firstname} {user.lastname}
        </Typography.Text>
      ),
    },
    {
      title: 'Позиция',
      key: 'position',
      dataIndex: 'position',
      render: (_, { position }) => (
        <Tag bordered={false} color="orange" key={position.name}>
          {position.name}
        </Tag>
      ),
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'email',
      render: (_, user) => <Typography.Text>{user.email}</Typography.Text>,
    },
    {
      title: 'Дейсвия',
      dataIndex: 'action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link">Редактировать</Button>
          <Button type="text" danger icon={<DeleteOutlined />}>
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  const dataSource = staff.map((user) => ({
    ...user,
    key: user._id,
  }));
  return (
    <>
      <Row style={{ marginBottom: 15 }}>
        <Col xs={24} lg={4} style={{ marginBottom: '20px' }}>
          <Space>
            Фильтры
            <Switch size="small" checked={isChecked} onChange={onChange} />
          </Space>
        </Col>
        {isChecked && (
          <Col xs={24} lg={20}>
            <FilterForm
              getAllStaff={fetchAllStaff}
              onSubmit={handleFormSubmit}
              positions={positions}
              loading={fetchLoading}
            />
          </Col>
        )}
      </Row>

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

export default Staff;
