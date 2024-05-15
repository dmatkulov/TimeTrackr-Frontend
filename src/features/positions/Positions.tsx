import React from 'react';
import type { TableProps } from 'antd';
import { Button, Space, Table } from 'antd';
import { useAppSelector } from '../../app/hooks';
import { selectPositions } from './positionsSlice';
import { Position } from '../../types/types.position';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

const Positions: React.FC = () => {
  const positions = useAppSelector(selectPositions);
  const { md } = useBreakpoint();

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
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />}>
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
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 16, position: ['topRight'] }}
      />
    </>
  );
};

export default Positions;
