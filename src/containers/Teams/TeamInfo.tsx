import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { appRoutes } from '../../common/routes';
import { useGetSelectedTeamQuery } from '../../store/services/team/team';

const TeamInfo: React.FC = () => {
  const { id } = useParams() as { id: string };

  const { data: team } = useGetSelectedTeamQuery(id);

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

  if (team) {
    console.log('team', team);
  }

  return (
    <>
      <div>{breadCrumb}</div>
      <main>Content</main>
    </>
  );
};

export default TeamInfo;
