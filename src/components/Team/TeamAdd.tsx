import { message } from 'antd';
import React from 'react';
import TeamForm from './TeamForm';
import { useCreateTeamMutation } from '../../store/services/team/team';
import { TeamMutation } from '../../types/types.team';
import { handleError } from '../../utils/handleError';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const TeamAdd: React.FC<Props> = ({ isOpen, onClose }) => {
  const [createTeam, { isLoading }] = useCreateTeamMutation();

  const handleSubmit = async (state: TeamMutation) => {
    try {
      const response = await createTeam(state).unwrap();
      message.success(response.message);
      onClose();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <TeamForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        loading={isLoading}
      />
    </>
  );
};

export default TeamAdd;
