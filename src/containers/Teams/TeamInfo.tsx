import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Col,
  Divider,
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
  PlusCircleFilled,
  PlusOutlined,
} from '@ant-design/icons';
import TeamMembersForm from '../../components/Team/TeamForm/TeamMembersForm';
import { useAppSelector } from '../../store/hooks/hooks';
import { selectUser } from '../../store/services/auth/authSlice';
import { Roles } from '../../enum/roles.enum';
import TeamForm from '../../components/Team/TeamForm/TeamForm';
import { TeamMutation } from '../../types/types.team';
import {
  useCreateProjectMutation,
  useGetProjectsByTeamQuery,
  useToggleIsDoneMutation,
} from '../../store/services/projects/projects';
import { apiURL } from '../../common/constants';
import TeamTable from './TeamTable';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import ProjectForm from '../../components/Project/ProjectForm';
import { ProjectMutation } from '../../types/types.project';
import ProjectsTable from '../../components/Project/ProjectsTable';

const blockStyle = {
  background: '#eee',
  padding: '24px',
  borderRadius: '16px',
};

const TeamInfo: React.FC = () => {
  const { id } = useParams() as { id: string };
  const { sm } = useBreakpoint();
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);
  const isTeamLead = user.roles.includes(Roles.TeamLead);

  const { data: team, refetch } = useGetSelectedTeamQuery(id);

  const { data: projects = [], refetch: refetchProjects } =
    useGetProjectsByTeamQuery(id);

  const { refetch: refetchAll } = useGetTeamsQuery();

  const [handleUpdate, { isLoading: updating, isError, error }] =
    useUpdateTeamMutation();

  const [deleteMember, { isLoading: deleting }] = useDeleteMembersMutation();

  const [deleteTeam, { isLoading: isDeleting }] = useDeleteTeamMutation();

  const [
    createProject,
    { isLoading, isError: isCreateError, error: createError },
  ] = useCreateProjectMutation();

  const [toggleStatus] = useToggleIsDoneMutation();

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

  useEffect(() => {
    refetchProjects();
  }, [refetchProjects]);

  const handleCreateProject = async (state: ProjectMutation) => {
    await createProject(state).unwrap();
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

  const handleStatus = async (value: boolean, projects: string[]) => {
    if (team) {
      await toggleStatus({
        teamId: team._id,
        mutation: { value, projects: projects },
      }).unwrap();
    }
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

  let editTeamForm;
  let teamMembersForm;
  let projectForm;
  let teamTable;
  let projectTable;

  if (team) {
    const mutation = {
      name: team.name,
      description: team.description || '',
      members: [],
    };

    editTeamForm = (
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

    teamMembersForm = (
      <TeamMembersForm
        existingUsers={team?.members}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAddMember}
        loading={updating}
      />
    );

    teamTable = (
      <TeamTable
        team={team}
        handleDelete={handleDeleteMember}
        deleting={deleting}
        open={showMembers}
        close={() => setShowMembers(false)}
      />
    );

    projectForm = (
      <ProjectForm
        onSubmit={handleCreateProject}
        loading={isLoading}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        isError={isCreateError}
        error={createError}
        existingTeamId={team._id}
      />
    );
  }

  if (projects) {
    projectTable = (
      <ProjectsTable projects={projects} handleStatus={handleStatus} />
    );
  }

  const addBtn = (
    <Button
      type="text"
      icon={<PlusCircleFilled />}
      onClick={() => setOpenModal(true)}
    >
      Добавить проект
    </Button>
  );

  return (
    team && (
      <>
        <div>{breadCrumb}</div>
        <main>
          <Row gutter={16} justify="space-between">
            <Col
              xs={24}
              style={{
                ...blockStyle,
                background: 'white',
              }}
            >
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
                      border: '1px solid #aeaeae',
                      width: toggleBtn ? '260px' : '34px',
                      height: '34px',
                      borderRadius: '8px',
                      transition: 'width 0.4s ease',
                      overflow: 'hidden',
                    }}
                  >
                    <Button
                      type="text"
                      onClick={() => {
                        setToggleBtn(!toggleBtn);
                      }}
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
                <div>
                  <Divider />
                  <Typography.Text style={{ color: '#7c7c7c' }}>
                    {team.description}
                  </Typography.Text>
                </div>
              )}
            </Col>
          </Row>

          <Row gutter={16} justify="space-between">
            <Col xs={24} style={{ margin: '50px 0 30px 0' }}>
              <Flex justify="space-between" align="center">
                {projects.length > 0 ? (
                  <Space>
                    <Typography.Text>Проекты</Typography.Text>
                    <Badge count={projects.length} />
                  </Space>
                ) : (
                  <Typography.Text>
                    Проекты в команде {team.name} отсуствуют
                  </Typography.Text>
                )}
                {isTeamLead && addBtn}
              </Flex>
            </Col>
          </Row>

          {projects.length > 0 && (
            <Row gutter={16} justify="space-between">
              <Col
                xs={24}
                style={{
                  ...blockStyle,
                  minHeight: '100px',
                }}
              >
                {projectTable}
              </Col>
            </Row>
          )}
        </main>

        {editTeamForm}
        {teamMembersForm}
        {projectForm}
        {teamTable}
      </>
    )
  );
};

export default TeamInfo;
