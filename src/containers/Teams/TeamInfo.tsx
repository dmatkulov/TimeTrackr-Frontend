import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
  useDeleteTeamMutation,
  useGetSelectedTeamQuery,
  useGetTeamsQuery,
  useUpdateTeamMutation,
} from '../../store/services/team/team';
import { UserSummary } from '../../types/types.user';
import UserAvatar from '../../components/UI/UserAvatar/UserAvatar';
import NoData from '../../components/UI/NoData/NoData';
import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PlusCircleFilled,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import TeamMembersForm from '../../components/Team/TeamForm/TeamMembersForm';
import { useAppSelector } from '../../store/hooks/hooks';
import { selectUser } from '../../store/services/auth/authSlice';
import { Roles } from '../../enum/roles.enum';
import TeamForm from '../../components/Team/TeamForm/TeamForm';
import { TeamMutation } from '../../types/types.team';

const TeamInfo: React.FC = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const isTeamLead = user.roles.includes(Roles.TeamLead);

  const { id } = useParams() as { id: string };
  const { sm } = useBreakpoint();

  const { data: team, refetch } = useGetSelectedTeamQuery(id);
  const { refetch: refetchAll } = useGetTeamsQuery();
  const [handleUpdate, { isLoading: updating, isError, error }] =
    useUpdateTeamMutation();
  const [deleteMember, { isLoading: deleting }] = useDeleteMembersMutation();
  const [deleteTeam, { isLoading: isDeleting }] = useDeleteTeamMutation();

  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [toggleBtn, setToggleBtn] = useState(false);

  const handleDeleteMember = async () => {
    await deleteMember({ id, mutation: { members: selected } });
    await refetch();
    await refetchAll();
  };

  const handleAddMember = async (members: string[]) => {
    await handleUpdate({ id, mutation: { members } });
    await refetch();
    await refetchAll();
  };

  const handleUpdateTeam = async (mutation: TeamMutation) => {
    await handleUpdate({
      id,
      mutation: { name: mutation.name, description: mutation.description },
    });
    await refetch();
    await refetchAll();
  };

  const handleDeleteTeam = async () => {
    await deleteTeam(id);
    await refetchAll();
    navigate(appRoutes.user.teams + 'all');
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
          {isTeamLead && (
            <Button
              type="link"
              icon={<PlusCircleFilled />}
              onClick={() => setOpen(true)}
            >
              {sm && 'Добавить'}
            </Button>
          )}
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
      hidden: selected.length > 0,
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
              type="text"
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
          title: <Link to={appRoutes.user.teams + 'all'}>Все команды</Link>,
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

  let form;

  if (team) {
    const mutation = {
      name: team.name,
      description: team.description || '',
      members: [],
    };

    form = (
      <TeamForm
        onSubmit={handleUpdateTeam}
        existingTeam={mutation}
        isOpen={show}
        onClose={() => setShow(false)}
        isError={isError}
        error={error}
        loading={updating}
        isEdit
      />
    );
  }

  return (
    team && (
      <>
        <div>{breadCrumb}</div>
        <main>
          <div>
            {team.isFavorite ? (
              <StarFilled style={{ color: '#FABB18' }} />
            ) : (
              <StarOutlined />
            )}
            {isTeamLead && (
              <Space
                key="1"
                align="center"
                style={{
                  border: '1px solid #d9d9d9',
                  width: toggleBtn ? '260px' : '34px',
                  height: '34px',
                  borderRadius: '9px',
                  transition: 'width 0.4s ease',
                  overflow: 'hidden',
                }}
              >
                <Button
                  type="text"
                  onClick={() => {
                    setToggleBtn(!toggleBtn);
                  }}
                  style={{ background: 'white' }}
                  icon={<MoreOutlined />}
                />
                <Space size="small">
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => setShow(true)}
                    size="small"
                  >
                    Изменить
                  </Button>
                  <Button
                    size="small"
                    type="text"
                    icon={<DeleteOutlined />}
                    disabled={isDeleting}
                    onClick={handleDeleteTeam}
                  >
                    Удалить
                  </Button>
                </Space>
              </Space>
            )}
          </div>

          <Typography.Title style={{ marginBottom: '30px' }}>
            {team.name}
          </Typography.Title>
          {team.description && (
            <div style={{ marginBottom: '30px' }}>
              <Typography.Text>{team.description}</Typography.Text>
            </div>
          )}

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
              {isTeamLead ? (
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
              ) : (
                <Table
                  locale={{ emptyText: <NoData /> }}
                  columns={columns}
                  dataSource={dataSource}
                  size="small"
                  style={{ cursor: 'default' }}
                  pagination={{
                    pageSize: 8,
                    position: ['bottomRight'],
                  }}
                />
              )}
            </Col>
          </Row>
        </main>
        {form}
        <TeamMembersForm
          existingUsers={team.members}
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={handleAddMember}
          loading={updating}
        />
      </>
    )
  );
};

export default TeamInfo;
