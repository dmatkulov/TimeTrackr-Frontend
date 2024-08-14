import { api } from '../../index';
import {
  AuthResponse,
  LoginMutation,
  RegisterMutation,
} from '../../../types/types.user';
import { authRoute } from '../../../utils/routes.service';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<AuthResponse, RegisterMutation>({
      query: (body) => ({
        url: authRoute.register,
        method: 'post',
        body,
      }),
    }),
    signIn: build.mutation<AuthResponse, LoginMutation>({
      query: (body) => ({
        url: authRoute.login,
        method: 'post',
        body,
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: authRoute.logout,
        method: 'delete',
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useLogoutMutation } =
  authApi;
export default authApi;
