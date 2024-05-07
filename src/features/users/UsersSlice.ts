import { User } from '../../types/types.user';
import { GlobalMessage, ValidationError } from '../../types/types.global';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getUsers, login } from './UsersThunks';
import { message } from 'antd';

interface UsersState {
  user: User | null;
  staff: User[];
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalMessage | null;
  logOutLoading: boolean;
  fetchAllLoading: boolean;
}

const initialState: UsersState = {
  user: null,
  staff: [],
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  logOutLoading: false,
  fetchAllLoading: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.fetchAllLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, { payload: data }) => {
        state.fetchAllLoading = false;
        state.staff = data.users;
      })
      .addCase(getUsers.rejected, (state) => {
        state.fetchAllLoading = false;
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

export const selectUser = (state: RootState) => state.users.user;
export const selectStaff = (state: RootState) => state.users.staff;
export const selectRegisterLoading = (state: RootState) =>
  state.users.registerError;
export const selectRegisterError = (state: RootState) =>
  state.users.registerError;
export const selectLoginLoading = (state: RootState) =>
  state.users.loginLoading;

export const selectLoginError = (state: RootState) => state.users.loginLoading;
export const selectLogoutLoading = (state: RootState) =>
  state.users.logOutLoading;
