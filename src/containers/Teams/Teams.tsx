import { useGetTeamsQuery } from '../../store/services/team/team';
import Spinner from '../../components/UI/Spin/Spin';
import TeamCard from '../../components/Team/TeamCard';
import { Col, Row } from 'antd';

const Teams = () => {
  const { data: teams = [], isFetching } = useGetTeamsQuery();
  console.log(teams);
  return (
    <div>
      Teams
      {isFetching && <Spinner />}
      <Row gutter={16}>
        {teams.map((team) => (
          <Col
            style={{ marginBottom: 16 }}
            key={team._id}
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
          >
            <TeamCard team={team} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Teams;
