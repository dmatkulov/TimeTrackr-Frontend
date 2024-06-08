import { TaskData } from '../../types/types.task';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createTask, deleteTask, getTasks } from './tasksThunks';
import { message } from 'antd';

interface TasksState {
  items: TaskData | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
}

const initialState: TasksState = {
  items: null,
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
        state.items = data;
      })
      .addCase(getTasks.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(deleteTask.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, { payload: data }) => {
        state.deleteLoading = false;
        void message.success(data.message);
      })
      .addCase(deleteTask.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
export const selectTasks = (state: RootState) => state.tasks.items;
export const selectTasksLoading = (state: RootState) =>
  state.tasks.fetchLoading;
export const selectTasksCreating = (state: RootState) =>
  state.tasks.createLoading;
export const selectDeleteTaskLoading = (state: RootState) =>
  state.tasks.deleteLoading;
