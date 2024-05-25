export interface TaskMutation {
  executionDate: string;
  tasks: TaskItem[];
}

interface TaskItem {
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  label: string;
}
