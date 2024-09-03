import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Flex,
  Row,
  Space,
  Tooltip,
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
import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import TeamMembersForm from '../../components/Team/TeamForm/TeamMembersForm';
import { useAppSelector } from '../../store/hooks/hooks';
import { selectUser } from '../../store/services/auth/authSlice';
import { Roles } from '../../enum/roles.enum';
import TeamForm from '../../components/Team/TeamForm/TeamForm';
import { TeamMutation } from '../../types/types.team';
import { useGetProjectsByTeamQuery } from '../../store/services/projects/projects';
import { apiURL } from '../../common/constants';
import TeamTable from './TeamTable';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import dayjs from 'dayjs';
import ProjectAdd from '../Projects/ProjectAdd';

const TeamInfo: React.FC = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const isTeamLead = user.roles.includes(Roles.TeamLead);

  const { id } = useParams() as { id: string };
  const { sm } = useBreakpoint();

  const { data: team, refetch } = useGetSelectedTeamQuery(id);
  const { data: projects = [] } = useGetProjectsByTeamQuery(id);
  const { refetch: refetchAll } = useGetTeamsQuery();
  const [handleUpdate, { isLoading: updating, isError, error }] =
    useUpdateTeamMutation();
  const [deleteMember, { isLoading: deleting }] = useDeleteMembersMutation();
  const [deleteTeam, { isLoading: isDeleting }] = useDeleteTeamMutation();

  const [open, setOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [showMembers, setShowMembers] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const handleDeleteMember = async (selected: string[]) => {
    await deleteMember({ id, mutation: { members: selected } });
    await refetch();
    await refetchAll();
  };

  if (projects) {
    console.log(projects);
  }

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
          <Flex
            vertical={!sm}
            gap={24}
            justify="space-between"
            align={!sm ? 'flex-start' : 'center'}
          >
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

            <Space size="small">
              <Avatar.Group
                maxCount={4}
                maxStyle={{
                  color: '#f56a00',
                  backgroundColor: '#fde3cf',
                  cursor: 'pointer',
                }}
                maxPopoverTrigger="hover"
              >
                {team.members.map((member) => (
                  <Tooltip
                    title={member.firstname}
                    placement="top"
                    key={member._id}
                  >
                    {member.photo ? (
                      <Avatar src={apiURL + '/' + member.photo} />
                    ) : (
                      <Avatar style={{ backgroundColor: '#f56a00' }}>
                        {member.firstname}
                      </Avatar>
                    )}
                  </Tooltip>
                ))}
              </Avatar.Group>
              <Button
                size="small"
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                onClick={() => setOpen(true)}
              />
              <Button
                size="small"
                shape="circle"
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => setShowMembers(true)}
              />
            </Space>
          </Flex>

          <Typography.Title style={{ marginBottom: '30px' }}>
            {team.name}
          </Typography.Title>
          {team.description && (
            <div style={{ marginBottom: '30px' }}>
              <Typography.Text>{team.description}</Typography.Text>
            </div>
          )}

          <Button onClick={() => setOpenModal(true)}>Добавить проект</Button>

          <Row gutter={16} justify="space-between">
            <Col
              xs={24}
              style={{
                background: '#eee',
                padding: '10px',
                borderRadius: '16px',
              }}
            >
              {projects.length > 0
                ? projects.map((project) => (
                    <Card
                      key={project._id}
                      bordered={false}
                      hoverable
                      extra={null}
                      styles={{
                        header: { padding: '0 16px' },
                        body: { padding: '10px 16px' },
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          backgroundColor: 'white',
                          borderRadius: '16px',
                        }}
                      >
                        <p>{project.name}</p>
                        <p>{dayjs(project.deadline).format('D MMMM, YYYY')}</p>
                        <p>{project.isDone ? 'Завершен' : 'В процессе'}</p>
                        <p>
                          {project.tasks}{' '}
                          {project.tasks === 2 ? 'задачи' : 'задач'}
                        </p>
                      </div>
                    </Card>
                  ))
                : 'Добавьте'}
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
        <TeamTable
          team={team}
          handleDelete={handleDeleteMember}
          deleting={deleting}
          open={showMembers}
          close={() => setShowMembers(false)}
        />
        <ProjectAdd isOpen={openModal} onClose={() => setOpenModal(false)} />
      </>
    )
  );
};

export default TeamInfo;
