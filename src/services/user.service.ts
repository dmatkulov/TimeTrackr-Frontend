import { useMutation, useQuery } from '@tanstack/react-query';
import { LoginMutation, UserResponse } from '../types/types.user';
import { axiosApi } from './axiosApi';
import { httpRoutes } from '../utils/routes';

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
      console.log(data.message);
    },
    onError: () => {
      console.log('error');
    },
  });
};
