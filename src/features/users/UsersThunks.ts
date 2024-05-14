import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  LoginMutation,
  LoginResponse,
  RegisterMutation,
  UserQueryParams,
  UserQueryValues,
  UsersResponse,
} from '../../types/types.user';
import { GlobalError, GlobalMessage } from '../../types/types.global';
import { axiosApi } from '../../utils/axiosApi';
import { httpRoutes } from '../../utils/routes';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store';
import { unsetUser } from './UsersSlice';

export const createUser = createAsyncThunk<
  LoginResponse,
  RegisterMutation,
  { rejectValue: GlobalError }
>('users/addUser', async (mutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    formData.append('email', mutation.email);
    formData.append('firstname', mutation.firstname);
    formData.append('lastname', mutation.lastname);
    formData.append('position', mutation.position);
    formData.append('contactInfo[mobile]', mutation.contactInfo.mobile);
    formData.append('contactInfo[city]', mutation.contactInfo.city);
    formData.append('contactInfo[street]', mutation.contactInfo.street);
    formData.append('password', mutation.password);
    formData.append('startDate', mutation.startDate);

    if (mutation.photo) {
      formData.append('photo', mutation.photo);
    }

    const response = await axiosApi.post<LoginResponse>(
      httpRoutes.newUser,
      formData,
    );
    return response.data;
  } catch (e) {
    if (
      isAxiosError(e) &&
      e.response?.status === 400 &&
      e.response?.data.message
    ) {
      return rejectWithValue(e.response);
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
