import { Task } from '../../types/types.task';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createTask, getTasks } from './tasksThunks';
import { message } from 'antd';

interface TasksState {
  items: Task[];
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
}

const initialState: TasksState = {
  items: [],
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createTask.fulfilled, (state, { payload: data }) => {
        state.createLoading = false;
        void message.success(data.message);
      })
      .addCase(createTask.rejected, (state, { payload: error }) => {
        state.createLoading = false;
        void message.error(error?.message);
      });

    builder
      .addCase(getTasks.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, { payload: data }) => {
        state.fetchLoading = false;
        state.items = data.tasks;
      })
      .addCase(getTasks.rejected, (state) => {
        state.fetchLoading = false;
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
export const selectTasks = (state: RootState) => state.tasks.items;
export const selectTasksLoading = (state: RootState) =>
  state.tasks.fetchLoading;

export const selectTasksCreating = (state: RootState) =>
  state.tasks.createLoading;
