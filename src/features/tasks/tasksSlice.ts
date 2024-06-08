import { TaskData, TaskDetails } from '../../types/types.task';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createTask, deleteTask, getOneTask, getTasks } from './tasksThunks';
import { message } from 'antd';

interface TasksState {
  taskData: TaskData | null;
  tasks: TaskData[];
  taskDetails: TaskDetails | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
  modal: boolean;
}

const initialState: TasksState = {
  taskData: null,
  tasks: [],
  taskDetails: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  modal: false,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleModal: (state, { payload }) => {
      state.modal = payload;
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
        state.taskDetails = data;
      })
      .addCase(getOneTask.rejected, (state) => {
        state.fetchOneLoading = false;
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

export const { toggleModal } = tasksSlice.actions;
export const selectTasks = (state: RootState) => state.tasks.taskData;
export const selectTaskDetails = (state: RootState) => state.tasks.taskDetails;
export const selectTasksLoading = (state: RootState) =>
  state.tasks.fetchLoading;
export const selectOneTaskLoading = (state: RootState) =>
  state.tasks.fetchOneLoading;
export const selectTasksCreating = (state: RootState) =>
  state.tasks.createLoading;
export const selectDeleteTaskLoading = (state: RootState) =>
  state.tasks.deleteLoading;
export const selectModal = (state: RootState) => state.tasks.modal;
