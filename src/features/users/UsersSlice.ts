import { StaffData, User } from '../../types/types.user';
import { GlobalMessage } from '../../types/types.global';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  createUser,
  deleteUser,
  getOneUser,
  getUsers,
  login,
  updateUser,
} from './UsersThunks';
import { message } from 'antd';

interface UsersState {
  user: User | null;
  staffAll: StaffData[];
  staff: User | null;
  registerLoading: boolean;
  loginLoading: boolean;
  loginError: GlobalMessage | null;
  logOutLoading: boolean;
  fetchAllLoading: boolean;
  fetchOneLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
}

const initialState: UsersState = {
  user: null,
  staffAll: [],
  staff: null,
  registerLoading: false,
  loginLoading: false,
  loginError: null,
  logOutLoading: false,
  fetchAllLoading: false,
  fetchOneLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.fetchAllLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, { payload: data }) => {
        state.fetchAllLoading = false;
        state.staffAll = data;
      })
      .addCase(getUsers.rejected, (state, { payload: error }) => {
        state.fetchAllLoading = false;

        void message.error(error?.message);
      });

    builder
      .addCase(createUser.pending, (state) => {
        state.registerLoading = true;
      })
      .addCase(createUser.fulfilled, (state, { payload: data }) => {
        state.registerLoading = false;

        if (data.message) {
          void message.success(data.message);
        }
      })
      .addCase(createUser.rejected, (state, { payload: error }) => {
        state.registerLoading = false;

        void message.error(error?.message);
      });

    builder
      .addCase(getOneUser.pending, (state) => {
        state.fetchOneLoading = true;
      })
      .addCase(getOneUser.fulfilled, (state, { payload: data }) => {
        state.fetchOneLoading = false;
        state.staff = data;
      })
      .addCase(getOneUser.rejected, (state) => {
        state.fetchOneLoading = false;
      });

    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload: data }) => {
        state.loginLoading = false;
        state.user = data.user;
        void message.success(data.message);
      })
      .addCase(login.rejected, (state, { payload: data }) => {
        state.loginLoading = false;
        void message.error(data?.message);
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload: data }) => {
        state.updateLoading = false;

        if (state.user?.role === 'admin') {
          state.staff = data.user;
        }
        void message.success(data.message);
      })
      .addCase(updateUser.rejected, (state, { payload: error }) => {
        state.updateLoading = false;
        void message.error(error?.message);
      });

    builder
      .addCase(deleteUser.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, { payload: data }) => {
        state.deleteLoading = false;
        void message.success(data.message);
      })
      .addCase(deleteUser.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const usersReducer = usersSlice.reducer;
export const { unsetUser } = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.user;
export const selectStaff = (state: RootState) => state.users.staffAll;
export const selectEmployee = (state: RootState) => state.users.staff;
export const selectRegisterLoading = (state: RootState) =>
  state.users.registerLoading;
export const selectLoginLoading = (state: RootState) =>
  state.users.loginLoading;
export const selectFetchAllLoading = (state: RootState) =>
  state.users.fetchAllLoading;
export const selectFetchOneLoading = (state: RootState) =>
  state.users.fetchOneLoading;
export const selectLoginError = (state: RootState) => state.users.loginLoading;
export const selectLogoutLoading = (state: RootState) =>
  state.users.logOutLoading;
export const selectUserUpdateLoading = (state: RootState) =>
  state.users.updateLoading;
export const selectDeleteUserLoading = (state: RootState) =>
  state.users.deleteLoading;
