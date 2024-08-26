import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Breadcrumb,
  Button,
  Col,
  Row,
  Space,
  Table,
  TableProps,
  Tag,
  Typography,
} from 'antd';
import { appRoutes } from '../../common/routes';
import {
  useDeleteMembersMutation,
  useGetSelectedTeamQuery,
  useGetTeamsQuery,
  useUpdateTeamMutation,
} from '../../store/services/team/team';
import { UserSummary } from '../../types/types.user';
import UserAvatar from '../../components/UI/UserAvatar/UserAvatar';
import NoData from '../../components/UI/NoData/NoData';
import { DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import TeamMembersForm from '../../components/Team/TeamForm/TeamMembersForm';

const TeamInfo: React.FC = () => {
  const { id } = useParams() as { id: string };
  const { sm } = useBreakpoint();

  const { data: team, refetch } = useGetSelectedTeamQuery(id);
  const { refetch: refetchAll } = useGetTeamsQuery();
  const [addMember, { isLoading: updating }] = useUpdateTeamMutation();
  const [deleteMember, { isLoading: deleting }] = useDeleteMembersMutation();

  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const handleDeleteMember = async () => {
    if (team) {
      await deleteMember({ id: team._id, mutation: { members: selected } });
      await refetch();
      await refetchAll();
    }
  };

  const handleAddMember = async (members: string[]) => {
    if (team) {
      await addMember({ id: team._id, mutation: { members } });
      await refetch();
      await refetchAll();
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelected(selectedRowKeys as string[]);
    },
  };

  const columns: TableProps<UserSummary>['columns'] = [
    {
      title: (
        <Space>
          Сотрудники{' '}
          <Button
            type="link"
            icon={<PlusCircleFilled />}
            onClick={() => setOpen(true)}
          >
            {sm && 'Добавить'}
          </Button>
        </Space>
      ),
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
    {
      title: selected.length > 1 && (
        <Button
          danger
          type="primary"
          size="small"
          icon={<DeleteOutlined />}
          disabled={deleting}
          onClick={handleDeleteMember}
        />
      ),
      align: 'end',
      hidden: !selected.length,
      key: 'actions',
      dataIndex: 'actions',
      width: '40px',
      render: (_, user) => (
        <>
          {selected.includes(user._id) && selected.length === 1 && team && (
            <Button
              danger
              type="primary"
              size="small"
              icon={<DeleteOutlined />}
              disabled={deleting}
              onClick={handleDeleteMember}
            />
          )}
        </>
      ),
    },
  ];

  const breadCrumb = (
    <Breadcrumb
      style={{ marginBottom: '30px' }}
      items={[
        {
          title: <Link to={appRoutes.user.teamsAll}>Все команды</Link>,
        },
        {
          title: team?.name || '',
        },
      ]}
    />
  );

  const dataSource = team?.members.map((user) => ({
    ...user,
    key: user._id,
  }));

  return (
    team && (
      <>
        <TeamMembersForm
          existingUsers={team.members}
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={handleAddMember}
          loading={updating}
        />
        <div>{breadCrumb}</div>
        <main>
          {team.name}
          <Row gutter={16} justify="space-between">
            <Col
              xs={24}
              lg={11}
              style={{
                background: '#eee',
                padding: '10px',
                borderRadius: '16px',
              }}
            >
              Проекты
            </Col>
            <Col
              xs={24}
              lg={12}
              style={{
                background: '#eee',
                padding: '10px',
                borderRadius: '16px',
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
            </Col>
          </Row>
        </main>
      </>
    )
  );
};

export default TeamInfo;
