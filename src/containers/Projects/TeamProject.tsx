import { Link, useParams } from 'react-router-dom';
import { useGetProjectQuery } from '../../store/services/projects/projects';
import { Breadcrumb } from 'antd';
import { appRoutes } from '../../common/routes';
import { useGetSelectedTeamQuery } from '../../store/services/team/team';
import ProjectInfo from './ProjectInfo';

const TeamProject = () => {
  const { teamId, projectId } = useParams() as {
    teamId: string;
    projectId: string;
  };

  const { data: projectSummary } = useGetProjectQuery(projectId);
  const { data: team } = useGetSelectedTeamQuery(teamId);

  const breadCrumb = (
    <Breadcrumb
      style={{ marginBottom: '30px' }}
      items={[
        {
          title: <Link to={appRoutes.user.teams}>Все команды</Link>,
        },
        {
          title: <Link to={appRoutes.user.teams + teamId}>{team?.name}</Link>,
        },
        {
          title: projectSummary?.project.name || '',
        },
      ]}
    />
  );

  return (
    projectSummary && (
      <div>
        {breadCrumb}
        <ProjectInfo projectSummary={projectSummary} />
      </div>
    )
  );
};

export default TeamProject;
