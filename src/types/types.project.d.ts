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

interface ProjectsList {
  _id: string;
  name: string;
  isFavorite: false;
}
