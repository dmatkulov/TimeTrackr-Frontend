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
import { FieldTimeOutlined, UserOutlined } from '@ant-design/icons';
import { StaffData, UserQueryValues } from '../../../types/types.user';
import FilterForm from './components/FilterForm';
import { getUsers } from '../UsersThunks';
import { fetchPositions } from '../../positions/positionsThunks';
import { selectPositions } from '../../positions/positionsSlice';
import { apiURL } from '../../../utils/constants';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

const Staff: React.FC = () => {
  const dispatch = useAppDispatch();
  const staff = useAppSelector(selectStaff);
  const positions = useAppSelector(selectPositions);
  const fetchLoading = useAppSelector(selectFetchAllLoading);

  const [isChecked, setIsChecked] = useState(false);
  const { sm, md, lg } = useBreakpoint();

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
      responsive: ['lg'],
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
      render: () => (
        <Space size={!sm ? 'small' : 'middle'}>
          <Button
            size={lg ? 'middle' : 'small'}
            shape="round"
            type="primary"
            icon={<FieldTimeOutlined />}
          >
            {lg && 'Статистика'}
          </Button>
          <Button
            shape="round"
            size={lg ? 'middle' : 'small'}
            icon={<UserOutlined />}
          >
            {lg && 'Профиль'}
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
