import React from 'react';
import {
  Avatar,
  Button,
  Card,
  Dropdown,
  Flex,
  MenuProps,
  Tag,
  Tooltip,
} from 'antd';
import { FolderOpenOutlined, MoreOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { useMediaQuery } from 'react-responsive';
import { Team } from '../../types/types.team';
import { apiURL } from '../../common/constants';
import { useToggleFavouriteMutation } from '../../store/services/team/team';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../common/routes';
import './index.css';

interface Props {
  team: Team;
}

const TeamCard: React.FC<Props> = ({ team }) => {
  const [toggle] = useToggleFavouriteMutation();
  const { md, lg } = useBreakpoint();
  const navigate = useNavigate();
  const xxs = useMediaQuery({
    query: '(min-width: 320px) and (max-width: 360px)',
  });

  const toggleFav = async (id: string, favourite: boolean) => {
    try {
      await toggle({ id, isFavorite: favourite }).unwrap();
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const items: MenuProps['items'] = [
    {
      key: 'favourite',
      label: team.isFavorite ? 'Удалить из избранного' : 'Добавить в избранное',
      onClick: async (info) => {
        info.domEvent.stopPropagation();
        await toggleFav(team._id, !team.isFavorite);
      },
    },
    {
      key: 'edit',
      label: 'Редактрировать',
      onClick: async (info) => {
        info.domEvent.stopPropagation();
      },
    },
    { type: 'divider' },
    {
      key: 'delete',
      label: 'Удалить',
      onClick: (info) => {
        info.domEvent.stopPropagation();
      },
    },
  ];

  const handleDropdownClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
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
            <Dropdown
              menu={{ items }}
              placement="bottomRight"
              overlayStyle={{ zIndex: 10 }}
              trigger={['click']}
            >
              <Button icon={<MoreOutlined />} onClick={handleDropdownClick} />
            </Dropdown>
          </>
        }
        onClick={() => navigate(appRoutes.user.teamsAll + '/' + team._id)}
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
                title={member.user.firstname}
                placement="top"
                key={member.user._id}
              >
                {member.user.photo ? (
                  <Avatar src={apiURL + '/' + member.user.photo} />
                ) : (
                  <Avatar style={{ backgroundColor: '#f56a00' }}>
                    {member.user.firstname}
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
