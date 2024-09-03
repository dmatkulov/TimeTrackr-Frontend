import React from 'react';
import { useCreateProjectMutation } from '../../store/services/projects/projects';
import { ProjectMutation } from '../../types/types.project';
import ProjectForm from '../../components/Project/ProjectForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectAdd: React.FC<Props> = ({ isOpen, onClose }) => {
  const [createProject, { isLoading, isError, error }] =
    useCreateProjectMutation();

  const handleSubmit = async (state: ProjectMutation) => {
    await createProject(state).unwrap();
  };
  return (
    <ProjectForm
      onSubmit={handleSubmit}
      loading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      isError={isError}
      error={error}
    />
  );
};

export default ProjectAdd;
