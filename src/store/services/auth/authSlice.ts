import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, User } from '../../../types/types.user';
import authApi from './auth';
import { RootState } from '../../store';
import { message } from 'antd';
import { userApi } from '../user/user';
import { handleError } from '../../../utils/handleError';

interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.signUp.matchFulfilled,
        (state, { payload: data }) => {
          state.user = data.user;
          void message.success(data.message);
        },
      )
      .addMatcher(
        authApi.endpoints.signIn.matchFulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.user = action.payload.user;
          void message.success(action.payload.message);
        },
      )
      .addMatcher(
        authApi.endpoints.signIn.matchRejected,
        (_state, { payload: error }) => {
          handleError(error);
        },
      )
      .addMatcher(
        authApi.endpoints.googleLogin.matchFulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.user = action.payload.user;
          void message.success(action.payload.message);
        },
      )
      .addMatcher(
        userApi.endpoints.updateUser.matchFulfilled,
        (state, { payload: data }) => {
          state.user = data.user;
          void message.success(data.message);
        },
      )
      .addMatcher(
        userApi.endpoints.updatePhoto.matchFulfilled,
        (state, { payload: data }) => {
          state.user = data.user;
          void message.success(data.message);
        },
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, () => {
        return initialState;
      });
  },
});

export const AuthReducer = authSlice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
