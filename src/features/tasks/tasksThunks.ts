import { createAsyncThunk } from '@reduxjs/toolkit';
import { BadRequestError, GlobalMessage } from '../../types/types.global';
import { TaskMutation } from '../../types/types.task';
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
      apiRoutes.newTask,
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
