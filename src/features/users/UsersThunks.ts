import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  LoginMutation,
  LoginResponse,
  RegisterMutation,
  StaffData,
  User,
  UserQueryParams,
  UserQueryValues,
} from '../../types/types.user';
import { BadRequestError, GlobalMessage } from '../../types/types.global';
import { axiosApi } from '../../utils/axiosApi';
import { apiRoutes } from '../../utils/routes';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store';
import { unsetUser } from './UsersSlice';

export const createUser = createAsyncThunk<
  LoginResponse,
  RegisterMutation,
  { rejectValue: BadRequestError }
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
      apiRoutes.newUser,
      formData,
    );
    return response.data;
  } catch (e) {
    if (
      isAxiosError(e) &&
      e.response?.status === 400 &&
      e.response?.data.message
    ) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const getOneUser = createAsyncThunk<User, string>(
  'users/getOne',
  async (id) => {
    const response = await axiosApi.get<User>(apiRoutes.userInfo + id);
    return response.data;
  },
);
export const getUsers = createAsyncThunk<
  StaffData[],
  UserQueryValues | undefined,
  { rejectValue: GlobalMessage }
>('users/fetchAll', async (params = {}, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
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

    const response = await axiosApi.get<StaffData[]>(apiRoutes.users, {
      params: query,
    });

    return response.data;
  } catch (e) {
    if (
      isAxiosError(e) &&
      e.response?.data &&
      e.response?.data.message &&
      e.response.status === 404
    ) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const login = createAsyncThunk<
  LoginResponse,
  LoginMutation,
  { rejectValue: GlobalMessage }
>('users/login', async (loginMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post(apiRoutes.sessions, loginMutation);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.data.message) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const logOut = createAsyncThunk<void, undefined, { state: RootState }>(
  'users/logout',
  async (_, { dispatch }) => {
    await axiosApi.delete(apiRoutes.sessions);
    dispatch(unsetUser());
  },
);
