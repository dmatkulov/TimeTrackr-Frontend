import React, { useCallback, useEffect, useState } from 'react';
import type { TableProps } from 'antd';
import { Button, Popconfirm, Space, Table } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectPositionDeleting,
  selectPositions,
  selectPositionsLoading,
} from './positionsSlice';
import { Position } from '../../types/types.position';
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import EditPositions from './EditPositions';
import Spinner from '../../components/UI/Spin/Spin';
import {
  deletePosition,
  fetchOnePosition,
  fetchPositions,
} from './positionsThunks';
import { getUsers } from '../users/UsersThunks';

const PositionsTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const positions = useAppSelector(selectPositions);
  const loading = useAppSelector(selectPositionsLoading);
  const deleting = useAppSelector(selectPositionDeleting);

  const { sm, md } = useBreakpoint();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = useCallback(
    async (id: string) => {
      await dispatch(deletePosition(id)).unwrap();
      await dispatch(fetchPositions());
    },
    [dispatch],
  );

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
            size="small"
            shape="round"
            icon={<EditOutlined />}
            onClick={() => fetchOne(position._id)}
            style={{
              width: '100%',
              fontSize: '12px',
            }}
          >
            {sm && 'Редактировать'}
          </Button>
          <Popconfirm
            title="Удаление позиции"
            description="Вы уверены, что хотите удалить?"
            disabled={deleting}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            okText="Удалить"
            cancelText="Отменить"
            onConfirm={() => handleDelete(position._id)}
          >
            <Button
              size="small"
              type="text"
              danger
              icon={<DeleteOutlined />}
              disabled={deleting}
              style={{
                width: '100%',
                fontSize: '12px',
              }}
            >
              {md && 'Удалить'}
            </Button>
          </Popconfirm>
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
      {loading ? (
        <Spinner />
      ) : (
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 10, position: ['topRight', 'bottomRight'] }}
        />
      )}
      <EditPositions open={open} onClose={handleClose} />
    </>
  );
};

export default PositionsTable;
