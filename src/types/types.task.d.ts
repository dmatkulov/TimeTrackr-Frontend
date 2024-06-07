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
  executionDate: string;
  tasks: Task[];
}

export interface TaskQueryParams {
  userId?: string;
  date?: string;
}
