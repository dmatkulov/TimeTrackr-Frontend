import { ProjectEnum } from '../../../enum/project.enum';

interface ProjectMutation {
  teamID: string;
  name: string;
  description: string;
  deadline: string;
  type: ProjectEnum;
}

interface Project {
  _id: string;
  name: string;
  isDone: boolean;
  deadline: string;
  description: string;
  type: ProjectEnum;
  tasks: number;
  teamID: string;
}

interface UpdateProjectArg {
  id: string;
  mutation: ProjectMutation;
}

interface ToggleProjectStatus {
  teamId: string;
  mutation: {
    value: boolean;
    projects: string[];
  };
}
