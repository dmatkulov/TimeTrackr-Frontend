import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  LoginMutation,
  LoginResponse,
  UserQueryParams,
  UsersResponse,
} from '../../types/types.user';
import { GlobalMessage } from '../../types/types.global';
import { axiosApi } from '../../utils/axiosApi';
import { httpRoutes } from '../../utils/routes';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store';
import { unsetUser } from './UsersSlice';

export const getUsers = createAsyncThunk<
  UsersResponse,
  UserQueryParams | undefined
>('users/fetchAll', async (params?) => {
  const query: Record<string, string | undefined> = {};

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

  console.log(response.data);
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
