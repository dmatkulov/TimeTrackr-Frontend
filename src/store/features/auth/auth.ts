import { api } from '../../index';
import {
  AuthResponse,
  LoginMutation,
  RegisterMutation,
} from '../../../types/types.user';
import { authRoute } from '../../../services/routes.service';

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
    googleLogin: build.mutation<AuthResponse, string>({
      query: (credentials) => ({
        url: authRoute.googleLogin,
        method: 'post',
        body: { credential: credentials },
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

export const {
  useSignUpMutation,
  useSignInMutation,
  useGoogleLoginMutation,
  useLogoutMutation,
} = authApi;
export default authApi;
