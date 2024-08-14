import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AuthResponse,
  LoginMutation,
  StaffData,
  UpdatePhotoArg,
  UpdateUserArg,
  User,
  UserMutation,
  UserQueryParams,
  UserQueryValues,
} from '../../../types/types.user';
import { GlobalMessage, ValidationError } from '../../../types/types.global';
import { axiosService } from '../../../utils/axios.service';
import { apiRoutes } from '../../../utils/routes.service';
import { isAxiosError } from 'axios';
import { RootState } from '../../store';
import { unsetUser } from '../auth/authSlice';

export const register = createAsyncThunk<
  AuthResponse,
  UserMutation,
  { rejectValue: ValidationError }
>('users/addUser', async (mutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    formData.append('email', mutation.email);
    formData.append('firstname', mutation.firstname);
    formData.append('lastname', mutation.lastname);
    if (mutation.phoneNumber) {
      formData.append('phoneNumber', mutation.phoneNumber);
    }

    if (mutation.password) {
      formData.append('password', mutation.password);
    }

    const response = await axiosService.post<AuthResponse>(
      apiRoutes.newUser,
      mutation,
    );
    return response.data;
  } catch (e) {
    if (
      isAxiosError(e) &&
      e.response?.status === 422 &&
      e.response?.data.message
    ) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const googleLogin = createAsyncThunk<
  AuthResponse,
  string,
  { rejectValue: GlobalMessage }
>('users/googleLogin', async (credential, { rejectWithValue }) => {
  try {
    const response = await axiosService.post(apiRoutes.google, { credential });
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const getOneUser = createAsyncThunk<User, string>(
  'users/getOne',
  async (id) => {
    const response = await axiosService.get<User>(apiRoutes.userInfo + id);
    return response.data;
  },
);
export const getUsers = createAsyncThunk<
  StaffData[],
  UserQueryValues | undefined,
  { rejectValue: GlobalMessage }
>('users/fetchAll', async (params = {}, { rejectWithValue }) => {
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

    const response = await axiosService.get<StaffData[]>(apiRoutes.users, {
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
  AuthResponse,
  LoginMutation,
  { rejectValue: GlobalMessage }
>('users/login', async (loginMutation, { rejectWithValue }) => {
  try {
    const response = await axiosService.post(apiRoutes.sessions, loginMutation);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.data.message) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const updateUser = createAsyncThunk<
  AuthResponse,
  UpdateUserArg,
  { rejectValue: GlobalMessage }
>('users/updateOne', async ({ id, mutation }, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    formData.append('email', mutation.email);
    formData.append('firstname', mutation.firstname);
    formData.append('lastname', mutation.lastname);
    formData.append('position', mutation.position);
    if (mutation.phoneNumber) {
      formData.append('phoneNumber', mutation.phoneNumber);
    }

    if (mutation.photo) {
      formData.append('photo', mutation.photo);
    }

    const response = await axiosService.patch<AuthResponse>(
      `${apiRoutes.users}/edit/${id}`,
      formData,
    );
    return response.data;
  } catch (e) {
    if (
      isAxiosError(e) &&
      e.response?.status === 422 &&
      e.response?.data.message
    ) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const updateUserPhoto = createAsyncThunk<
  AuthResponse,
  UpdatePhotoArg,
  { rejectValue: GlobalMessage }
>('users/updateOnePhoto', async ({ id, mutation }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    if (mutation.photo) {
      formData.append('photo', mutation.photo);
    }

    const response = await axiosService.patch<AuthResponse>(
      `${apiRoutes.users}/${apiRoutes.updatePhoto}${id}`,
      formData,
    );
    return response.data;
  } catch (e) {
    if (
      isAxiosError(e) &&
      e.response?.status === 422 &&
      e.response?.data.message
    ) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const logOut = createAsyncThunk<void, undefined, { state: RootState }>(
  'users/logout',
  async (_, { dispatch }) => {
    await axiosService.delete(apiRoutes.sessions);
    dispatch(unsetUser());
  },
);

export const deleteUser = createAsyncThunk<GlobalMessage, string>(
  'users/deleteOne',
  async (id) => {
    const response = await axiosService.delete(apiRoutes.deleteUser + id);
    return response.data;
  },
);
