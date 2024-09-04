import { ProjectEnum } from '../../../enum/project.enum';

interface ProjectQuery {
  teamId?: string;
  taskId?: string;
}

interface ProjectMutation {
  teamID: string;
  name: string;
  description: string;
  deadline: string;
  type: ProjectEnum;
}

interface ProjectSummary {
  _id: string;
  name: string;
  isDone: boolean;
  deadline: string;
  type: ProjectEnum;
  tasks: number;
}

interface ToggleProjectStatus {
  teamId: string;
  mutation: {
    value: boolean;
    projects: string[];
  };
}
