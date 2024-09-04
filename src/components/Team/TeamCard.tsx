import React from 'react';
import { Avatar, Button, Card, Flex, Tag, Tooltip } from 'antd';
import {
  FolderOpenOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { useMediaQuery } from 'react-responsive';
import { Team } from '../../types/types.team';
import { useToggleFavouriteTeamMutation } from '../../store/services/team/team';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../common/routes';
import './index.css';
import { apiURL } from '../../common/constants';

interface Props {
  team: Team;
}

const TeamCard: React.FC<Props> = ({ team }) => {
  const [toggle] = useToggleFavouriteTeamMutation();
  const { md, lg } = useBreakpoint();
  const navigate = useNavigate();
  const xxs = useMediaQuery({
    query: '(min-width: 320px) and (max-width: 360px)',
  });

  const toggleFav = async (id: string) => {
    try {
      await toggle({ id }).unwrap();
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  return (
    <>
      <Card
        title={team.name}
        bordered={false}
        hoverable
        style={{
          height: '100%',
        }}
        className="team-card"
        styles={{
          header: { border: 'none', padding: '0 16px' },
          body: { padding: '24px 16px' },
        }}
        extra={
          <>
            <Button
              type="text"
              style={{ color: '#969a9e' }}
              onClick={async (event: React.MouseEvent) => {
                event.stopPropagation();
                await toggleFav(team._id);
              }}
              icon={
                team.isFavorite ? (
                  <StarFilled style={{ color: '#FABB18' }} />
                ) : (
                  <StarOutlined />
                )
              }
            />
          </>
        }
        onClick={() => navigate(appRoutes.user.teams + team._id)}
      >
        <Flex
          justify="space-between"
          vertical={xxs}
          align={(md && !lg) || xxs ? 'flex-start' : 'center'}
          gap={12}
          wrap={md}
        >
          <Avatar.Group
            size="small"
            maxCount={3}
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
          <Tag
            style={{ marginRight: 0, borderRadius: '12px' }}
            bordered={false}
            icon={<FolderOpenOutlined />}
            color="orange"
          >
            10 проектов
          </Tag>
        </Flex>
      </Card>
    </>
  );
};

export default TeamCard;
