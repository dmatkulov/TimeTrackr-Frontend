import { createAsyncThunk } from '@reduxjs/toolkit';
import { BadRequestError, GlobalMessage } from '../../types/types.global';
import {
  TaskData,
  TaskDeleteArgs,
  TaskDetails,
  TaskMutation,
  TaskQueryParams,
} from '../../types/types.task';
import { isAxiosError } from 'axios';
import axiosApi from '../../utils/axiosApi';
import { apiRoutes } from '../../utils/routes';

export const createTask = createAsyncThunk<
  GlobalMessage,
  TaskMutation,
  { rejectValue: BadRequestError }
>('tasks/create', async (mutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<GlobalMessage>(
      apiRoutes.createTask,
      mutation,
    );
    return response.data;
  } catch (e) {
    if (
      isAxiosError(e) &&
      e.response?.status &&
      e.response?.status === 400 &&
      e.response?.data.message
    ) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const getTasks = createAsyncThunk<TaskData, TaskQueryParams | undefined>(
  'tasks/get',
  async (params = {}) => {
    const query: TaskQueryParams = {};

    if (params) {
      if (params.date) {
        query.date = params.date;
      }
    }
    const response = await axiosApi.get<TaskData>(apiRoutes.tasks, {
      params: query,
    });

    return response.data;
  },
);

export const getOneTask = createAsyncThunk<TaskDetails, TaskDeleteArgs>(
  'tasks/getOne',
  async (params) => {
    const response = await axiosApi.get<TaskDetails>(
      apiRoutes.getTask + '/' + params.id + '?taskId=' + params.taskId,
    );
    return response.data;
  },
);

export const deleteTask = createAsyncThunk<GlobalMessage, TaskDeleteArgs>(
  'tasks/deleteOne',
  async (params) => {
    const response = await axiosApi.delete<GlobalMessage>(
      apiRoutes.deleteTask + '/' + params.id + '?taskId=' + params.taskId,
    );
    return response.data;
  },
);
