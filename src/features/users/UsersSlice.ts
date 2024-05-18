import { StaffData, User } from '../../types/types.user';
import { GlobalMessage } from '../../types/types.global';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createUser, getOneUser, getUsers, login } from './UsersThunks';
import { message } from 'antd';

interface UsersState {
  user: User | null;
  staff: StaffData[];
  employee: User | null;
  registerLoading: boolean;
  loginLoading: boolean;
  loginError: GlobalMessage | null;
  logOutLoading: boolean;
  fetchAllLoading: boolean;
  fetchOneLoading: boolean;
}

const initialState: UsersState = {
  user: null,
  staff: [],
  employee: null,
  registerLoading: false,
  loginLoading: false,
  loginError: null,
  logOutLoading: false,
  fetchAllLoading: false,
  fetchOneLoading: false,
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
        state.staff = data;
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
        state.employee = data;
      })
      .addCase(getOneUser.rejected, (state) => {
        state.fetchOneLoading = true;
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
  },
});

export const usersReducer = usersSlice.reducer;
export const { unsetUser } = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.user;
export const selectStaff = (state: RootState) => state.users.staff;
export const selectEmployee = (state: RootState) => state.users.employee;
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
