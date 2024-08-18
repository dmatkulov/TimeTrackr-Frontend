import React from 'react';
import TeamForm from './TeamForm';
import {
  useCreateTeamMutation,
  useGetTeamsQuery,
} from '../../store/services/team/team';
import { TeamMutation } from '../../types/types.team';
import { message } from 'antd';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const TeamAdd: React.FC<Props> = ({ isOpen, onClose }) => {
  const [createTeam, { isLoading, isError, error }] = useCreateTeamMutation();
  const { refetch } = useGetTeamsQuery();

  const handleSubmit = async (state: TeamMutation) => {
    const response = await createTeam(state).unwrap();
    message.success(response.message);
    await refetch();
    onClose();
  };

  return (
    <>
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
