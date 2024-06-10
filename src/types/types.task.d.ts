import { Author } from './types.user';

export interface TaskMutation {
  executionDate: string;
  tasks: TaskItem[];
}

interface TaskItem {
  startTime: string;
  endTime: string;
  timeSpent: string;
  title: string;
  description: string;
  label: string;
}

export interface Task {
  _id: string;
  startTime: string;
  endTime: string;
  timeSpent: string;
  title: string;
  description: string;
  label: string;
}

export interface TaskData {
  _id: string;
  userId: Author;
  executionDate: string;
  tasks: Task[];
}

export interface TaskDetails {
  _id: string;
  executionDate: string;
  userId: Author;
  task: Task;
}

export interface TaskQueryParams {
  userId?: string;
  date?: string;
}

export interface TaskDeleteArgs {
  id: string;
  taskId: string;
}
