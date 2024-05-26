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
