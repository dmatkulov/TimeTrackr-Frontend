import { useMutation, useQuery } from '@tanstack/react-query';
import { LoginMutation, UserResponse } from '../types/types.user';
import { axiosApi } from './axiosApi';
import { httpRoutes } from '../utils/routes';
import { message } from 'antd';
import { isAxiosError } from 'axios';

export const GetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {},
  });
};

export const login = () => {
  return useMutation({
    mutationKey: ['user'],
    mutationFn: async (loginMutation: LoginMutation) => {
      const response = await axiosApi.post<UserResponse>(
        httpRoutes.login,
        loginMutation,
      );
      return response.data;
    },
    onSuccess: (data) => {
      void message.success(data.message);
    },
    onError: (error) => {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.data.message
      ) {
        void message.error(error.response.data.message);
      }
      throw error;
    },
  });
};
