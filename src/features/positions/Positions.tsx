import React, { useCallback, useEffect, useState } from 'react';
import type { TableProps } from 'antd';
import { Button, Space, Table } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPositions, selectPositionsLoading } from './positionsSlice';
import { Position } from '../../types/types.position';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import EditPositions from './EditPositions';
import Spinner from '../../components/UI/Spin/Spin';
import { fetchOnePosition } from './positionsThunks';
import { getUsers } from '../users/UsersThunks';

const Positions: React.FC = () => {
  const dispatch = useAppDispatch();
  const positions = useAppSelector(selectPositions);
  const fetchLoading = useAppSelector(selectPositionsLoading);

  const { md } = useBreakpoint();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const fetchOne = useCallback(
    async (id: string) => {
      await dispatch(fetchOnePosition(id));
      setOpen(true);
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const columns: TableProps<Position>['columns'] = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      width: '70%',
    },
    {
      title: 'Дейсвия',
      dataIndex: 'action',
      key: 'action',
      render: (_, position) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => fetchOne(position._id)}
          >
            {md && 'Редактировать'}
          </Button>
          <Button type="text" danger icon={<DeleteOutlined />}>
            {md && 'Удалить'}
          </Button>
        </Space>
      ),
    },
  ];

  const dataSource = positions.map((position) => ({
    ...position,
    key: position._id,
  }));

  return (
    <>
      {fetchLoading ? (
        <Spinner />
      ) : (
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 10, position: ['topRight'] }}
        />
      )}
      <EditPositions open={open} onClose={handleClose} />
    </>
  );
};

export default Positions;
