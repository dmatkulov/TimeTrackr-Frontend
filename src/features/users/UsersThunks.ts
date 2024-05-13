import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  LoginMutation,
  LoginResponse,
  RegisterMutation,
  UserQueryParams,
  UserQueryValues,
  UsersResponse,
} from '../../types/types.user';
import { GlobalMessage } from '../../types/types.global';
import { axiosApi } from '../../utils/axiosApi';
import { httpRoutes } from '../../utils/routes';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store';
import { unsetUser } from './UsersSlice';
import { message } from 'antd';

export const createUser = createAsyncThunk<
  LoginResponse,
  RegisterMutation
  // { rejectValue: GlobalMessage }
>('users/addUser', async (mutation) => {
  try {
    const response = await axiosApi.post<LoginResponse>(
      httpRoutes.newUser,
      mutation,
    );
    return response.data;
  } catch (e) {
    if (
      isAxiosError(e) &&
      e.response?.status === 500 &&
      e.response?.data.message
    ) {
      console.log(e);
      void message.error('Пользователь с такой почтой уже зарегистрирован!');
      // return rejectWithValue(e);
    }

    if (
      isAxiosError(e) &&
      e.response?.status === 400 &&
      e.response?.data.message
    ) {
      console.log(e.response?.data.message);
      void message.error(e.response?.data.message);
    }

    console.log(e);
    throw e;
  }
});
export const getUsers = createAsyncThunk<
  UsersResponse,
  UserQueryValues | undefined
>('users/fetchAll', async (params?) => {
  const query: UserQueryParams = {};

  if (params) {
    if (params.positions) {
      query.positions = params.positions?.join(',');
    }
    if (params.email) {
      query.email = params.email;
    }

    if (params.lastname) {
      query.lastname = params.lastname;
    }
  }

  const response = await axiosApi.get<UsersResponse>(httpRoutes.users, {
    params: query,
  });

  return response.data;
});

export const login = createAsyncThunk<
  LoginResponse,
  LoginMutation,
  { rejectValue: GlobalMessage }
>('users/login', async (loginMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post(httpRoutes.sessions, loginMutation);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.data.message) {
      console.log(e);
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const logOut = createAsyncThunk<void, undefined, { state: RootState }>(
  'users/logout',
  async (_, { dispatch }) => {
    await axiosApi.delete(httpRoutes.sessions);
    dispatch(unsetUser());
  },
);
