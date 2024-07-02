import { Author } from './types.user';

export interface Task {
  _id: string;
  startTime: string;
  endTime: string;
  timeSpent: number;
  title: string;
  description: string;
  label: string;
}

export interface Tasks {
  _id: string;
  userId: Author;
  executionDate: string;
  totalTimeSpent: number;
  tasks: Task[];
}

export interface TasksMutation {
  executionDate: string;
  tasks: TaskMutation[];
}

interface TaskMutation {
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  label: string;
}

export interface TaskInfo extends Task {
  globalId: string;
  author: Author;
  executionDate: string;
}

export interface TaskQueryParams {
  userId?: string;
  date?: string;
}

export interface TaskDeleteArgs {
  id: string;
  taskId: string;
}

export interface TaskEditArgs {
  id: string;
  taskId: string;
  task: TaskMutation;
}
