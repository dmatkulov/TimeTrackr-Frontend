import { createAsyncThunk } from '@reduxjs/toolkit';
import { BadRequestError, GlobalMessage } from '../../types/types.global';
import {
  TaskDeleteArgs,
  TaskEditArgs,
  TaskInfo,
  TaskQueryParams,
  Tasks,
  TasksMutation,
} from '../../types/types.task';
import { isAxiosError } from 'axios';
import axiosService from '../../services/axios.service';
import { apiRoutes } from '../../services/routes.service';

export const createTask = createAsyncThunk<
  GlobalMessage,
  TasksMutation,
  { rejectValue: BadRequestError }
>('tasks/create', async (mutation, { rejectWithValue }) => {
  try {
    const response = await axiosService.post<GlobalMessage>(
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

export const getTasks = createAsyncThunk<Tasks, TaskQueryParams | undefined>(
  'tasks/get',
  async (params = {}) => {
    const query: TaskQueryParams = {};

    if (params) {
      if (params.date) {
        query.date = params.date;
      }
    }
    const response = await axiosService.get<Tasks>(apiRoutes.tasks, {
      params: query,
    });

    return response.data;
  },
);

export const getOneTask = createAsyncThunk<TaskInfo, TaskDeleteArgs>(
  'tasks/getOne',
  async (params) => {
    const response = await axiosService.get<TaskInfo>(
      apiRoutes.getTask + '/' + params.id + '?taskId=' + params.taskId,
    );
    return response.data;
  },
);

export const editTask = createAsyncThunk<
  GlobalMessage,
  TaskEditArgs,
  { rejectValue: BadRequestError }
>('tasks/edit', async (mutation, { rejectWithValue }) => {
  try {
    const response = await axiosService.patch<GlobalMessage>(
      apiRoutes.editTask + mutation.id + '?taskId=' + mutation.taskId,
      mutation.task,
    );
    return response.data;
  } catch (e) {
    if (
      isAxiosError(e) &&
      e.response?.status &&
      e.response?.status === 400 &&
      e.response?.data.message
    ) {
      console.log(e);
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const deleteTask = createAsyncThunk<GlobalMessage, TaskDeleteArgs>(
  'tasks/deleteOne',
  async (params) => {
    const response = await axiosService.delete<GlobalMessage>(
      apiRoutes.deleteTask + '/' + params.id + '?taskId=' + params.taskId,
    );
    return response.data;
  },
);
