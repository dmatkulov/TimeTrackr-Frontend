import React, { useState } from 'react';
import { Button, Modal, Space, Table, TableProps, Tag, Typography } from 'antd';
import { UserSummary } from '../../types/types.user';
import { DeleteOutlined } from '@ant-design/icons';
import UserAvatar from '../../components/UI/UserAvatar/UserAvatar';
import NoData from '../../components/UI/NoData/NoData';
import { Team } from '../../types/types.team';

interface Props {
  team: Team;
  handleDelete: (members: string[]) => void;
  deleting: boolean;
  open: boolean;
  close: () => void;
}

const TeamTable: React.FC<Props> = ({
  team,
  handleDelete,
  deleting,
  open,
  close,
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleDeleteMember = () => {
    handleDelete(selected);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelected(selectedRowKeys as string[]);
    },
  };

  const dataSource = team.members.map((user) => ({
    ...user,
    key: user._id,
  }));

  const columns: TableProps<UserSummary>['columns'] = [
    {
      title: 'Сотрудники',
      dataIndex: 'firstname',
      key: 'firstname',
      render: (_, user) => (
        <>
          <Space>
            <UserAvatar
              image={user.photo}
              lastname={user.lastname}
              firstname={user.firstname}
            />
            <Typography.Text>
              {user.firstname} {user.lastname}
            </Typography.Text>
          </Space>
        </>
      ),
    },
    {
      title: 'Позиция',
      key: 'position',
      dataIndex: 'position',
      responsive: ['sm'],
      render: (_, { position }) => (
        <Tag bordered={false} color={position?.tag}>
          {position.name}
        </Tag>
      ),
    },
  ];
  return (
    <>
      <Modal
        title="Удалить сотрудников"
        open={open}
        onCancel={close}
        footer={[
          <Button onClick={close}>Отменить</Button>,
          selected.length > 0 && (
            <Button
              danger
              type="primary"
              icon={<DeleteOutlined />}
              disabled={deleting}
              onClick={handleDeleteMember}
            >
              Удалить
            </Button>
          ),
        ]}
        styles={{
          body: {
            margin: '20px 0 10px 0',
            padding: '10px 0',
          },
        }}
      >
        <Table
          locale={{ emptyText: <NoData /> }}
          columns={columns}
          dataSource={dataSource}
          size="small"
          style={{ cursor: 'default' }}
          rowSelection={{
            ...rowSelection,
          }}
          pagination={{
            pageSize: 8,
            position: ['bottomRight'],
          }}
        />
      </Modal>
    </>
  );
};

export default TeamTable;
