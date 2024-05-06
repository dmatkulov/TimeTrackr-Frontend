import { User } from '../../types/types.user';
import { GlobalMessage, ValidationError } from '../../types/types.global';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { login } from './UsersThunks';
import { message } from 'antd';

interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalMessage | null;
  logOutLoading: boolean;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  logOutLoading: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
export const selectRegisterLoading = (state: RootState) =>
  state.users.registerError;
export const selectRegisterError = (state: RootState) =>
  state.users.registerError;
export const selectLoginLoading = (state: RootState) =>
  state.users.loginLoading;

export const selectLoginError = (state: RootState) => state.users.loginLoading;
export const selectLogoutLoading = (state: RootState) =>
  state.users.logOutLoading;
