import { UserSummary } from './types.user';

export interface Task {
  _id: string;
  user: UserSummary;
  executionDate: string;
  description: string;
  title: string;
  status: string;
  type: string;
  timeExpected: string;
  timeSpent: string;
  timeCalculated: number;
}

export interface TaskMutation {
  user: string;
  executionDate: string;
  description: string;
  title: string;
  timeExpected: string;
  type: string;
}

export interface AddTaskArg {
  id: string;
  mutation: TaskMutation;
}
