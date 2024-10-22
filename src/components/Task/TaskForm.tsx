import React from 'react';
import { TaskMutation } from '../../types/types.task';
import { TypeEnum } from '../../enum/type.enum';

const initialsState: TaskMutation = {
  title: '',
  description: '',
  user: '',
  executionDate: '',
  timeExpected: '',
  type: TypeEnum.NEW_TASK,
};

const TaskForm = () => {
  return <div></div>;
};

export default TaskForm;
