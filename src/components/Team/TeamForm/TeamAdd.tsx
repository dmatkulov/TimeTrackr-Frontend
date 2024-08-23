import React from 'react';
import TeamForm from './TeamForm';
import { useCreateTeamMutation } from '../../../store/services/team/team';
import { TeamMutation } from '../../../types/types.team';
import { message, Select, Space } from 'antd';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const TeamAdd: React.FC<Props> = ({ isOpen, onClose }) => {
  const [createTeam, { isLoading, isError, error }] = useCreateTeamMutation();

  const handleSubmit = async (state: TeamMutation) => {
    const response = await createTeam(state).unwrap();
    message.success(response.message);
    onClose();
  };

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const options = [
    {
      label: 'China',
      value: 'china',
      emoji: '🇨🇳',
      desc: 'China (中国)',
    },
    {
      label: 'USA',
      value: 'usa',
      emoji: '🇺🇸',
      desc: 'USA (美国)',
    },
    {
      label: 'Japan',
      value: 'japan',
      emoji: '🇯🇵',
      desc: 'Japan (日本)',
    },
    {
      label: 'Korea',
      value: 'korea',
      emoji: '🇰🇷',
      desc: 'Korea (韩国)',
    },
  ];

  return (
    <>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="select one country"
        // defaultValue={['china']}
        onChange={handleChange}
        options={options}
        optionRender={(option) => (
          <Space>
            <span role="img" aria-label={option.data.label}>
              {option.data.emoji}
            </span>
            {option.data.desc}
          </Space>
        )}
      />
      <TeamForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        loading={isLoading}
        isError={isError}
        error={error}
      />
    </>
  );
};

export default TeamAdd;
