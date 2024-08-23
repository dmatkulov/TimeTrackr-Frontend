import { useGetTeamsQuery } from '../../store/services/team/team';
import Spinner from '../../components/UI/Spin/Spin';
import TeamCard from '../../components/Team/TeamCard';
import { Button, Col, Divider, Flex, Row, Typography } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import React, { useState } from 'react';
import TeamAdd from '../../components/Team/TeamForm/TeamAdd';

const Teams: React.FC = () => {
  const { data: teams = [], isFetching } = useGetTeamsQuery();
  const [open, setOpen] = useState<boolean>(false);

  const teamList = teams.filter((team) => !team.isFavorite);
  const selectedTeamList = teams.filter((team) => team.isFavorite);
  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        style={{ margin: '20px 0 50px 0' }}
      >
        <Typography.Title level={2} style={{ margin: 0 }}>
          Мои команды
        </Typography.Title>
        <Button
          onClick={() => setOpen(true)}
          size="large"
          type="text"
          style={{ color: '#3947cf' }}
          icon={<PlusCircleFilled />}
          iconPosition="start"
        >
          Добавить команду
        </Button>
      </Flex>
      <Divider style={{ margin: '0 0 50px 0' }} />
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          {selectedTeamList.length > 0 && (
            <Row gutter={24} style={{ marginBottom: '20px' }}>
              <Col span={24} style={{ marginBottom: '20px' }}>
                <Typography.Text>Избранное</Typography.Text>
              </Col>
              {selectedTeamList.map((team) => (
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
              <Divider style={{ margin: '30px 0' }} />
            </Row>
          )}
          <Row gutter={16}>
            {teamList.map((team) => (
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
        </>
      )}
      <TeamAdd isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Teams;
