import { TaskInfo, Tasks } from '../../../types/types.task';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import {
  createTask,
  deleteTask,
  editTask,
  getOneTask,
  getTasks,
} from './tasksThunks';
import { message } from 'antd';

interface TasksState {
  tasks: Tasks[];
  taskData: Tasks | null;
  task: TaskInfo | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
  isEdit: boolean;
}

const initialState: TasksState = {
  tasks: [],
  taskData: null,
  task: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  isEdit: false,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleEditForm: (state, { payload }) => {
      state.isEdit = payload;
    },
  },
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
        state.taskData = data;
      })
      .addCase(getTasks.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(getOneTask.pending, (state) => {
        state.fetchOneLoading = true;
      })
      .addCase(getOneTask.fulfilled, (state, { payload: data }) => {
        state.fetchOneLoading = false;
        state.task = data;
      })
      .addCase(getOneTask.rejected, (state) => {
        state.fetchOneLoading = false;
      });

    builder
      .addCase(editTask.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(editTask.fulfilled, (state, { payload: data }) => {
        state.updateLoading = false;
        void message.success(data.message);
      })
      .addCase(editTask.rejected, (state) => {
        state.updateLoading = false;
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

export const { toggleEditForm } = tasksSlice.actions;
export const selectTasks = (state: RootState) => state.tasks.taskData;
export const selectTask = (state: RootState) => state.tasks.task;
export const selectTasksLoading = (state: RootState) =>
  state.tasks.fetchLoading;
export const selectOneTaskLoading = (state: RootState) =>
  state.tasks.fetchOneLoading;
export const selectTasksCreating = (state: RootState) =>
  state.tasks.createLoading;
export const selectDeleteTaskLoading = (state: RootState) =>
  state.tasks.deleteLoading;

export const selectTaskUpdateLoading = (state: RootState) =>
  state.tasks.updateLoading;
export const selectEditForm = (state: RootState) => state.tasks.isEdit;
