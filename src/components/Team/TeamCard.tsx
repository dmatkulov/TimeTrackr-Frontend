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
import {
  DeleteOutlined,
  MoreOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { useMediaQuery } from 'react-responsive';
import { Team } from '../../types/types.team';
import { apiURL } from '../../common/constants';
import { useToggleFavouriteMutation } from '../../store/services/team/team';

interface Props {
  team: Team;
}

const TeamCard: React.FC<Props> = ({ team }) => {
  const [toggle] = useToggleFavouriteMutation();
  const { md, lg } = useBreakpoint();

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
      key: '1',
      label: team.isFavorite ? 'Удалить из избранного' : 'Добавить в избранное',
      onClick: async (info) => {
        info.domEvent.stopPropagation();
        await toggleFav(team._id, !team.isFavorite);
      },
      icon: team.isFavorite ? <StarFilled /> : <StarOutlined />,
    },
    {
      key: '2',
      danger: true,
      label: 'Удалить',
      onClick: (info) => {
        info.domEvent.stopPropagation();
      },
      icon: <DeleteOutlined />,
      disabled: false,
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
        style={{ height: '100%', boxShadow: 'none' }}
        styles={{ header: { border: 'none' } }}
        extra={
          <>
            <Dropdown
              menu={{ items }}
              placement="bottomRight"
              arrow
              overlayStyle={{ zIndex: 10 }}
              trigger={['click']}
            >
              <Button icon={<MoreOutlined />} onClick={handleDropdownClick} />
            </Dropdown>
          </>
        }
        onClick={() => console.log('clicked card')}
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
              <Tooltip title={member.user.firstname} placement="top">
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
          <Tag style={{ marginRight: 0 }} bordered={false}>
            10 проектов
          </Tag>
        </Flex>
      </Card>
    </>
  );
};

export default TeamCard;
