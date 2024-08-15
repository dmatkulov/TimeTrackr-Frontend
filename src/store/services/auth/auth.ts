import { api } from '../../index';
import {
  AuthResponse,
  LoginMutation,
  RegisterMutation,
} from '../../../types/types.user';
import { authUrl } from '../../../common/routes';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<AuthResponse, RegisterMutation>({
      query: (body) => ({
        url: authUrl.register,
        method: 'post',
        body,
      }),
    }),
    signIn: build.mutation<AuthResponse, LoginMutation>({
      query: (body) => ({
        url: authUrl.login,
        method: 'post',
        body,
      }),
    }),
    googleLogin: build.mutation<AuthResponse, string>({
      query: (credentials) => ({
        url: authUrl.googleLogin,
        method: 'post',
        body: { credential: credentials },
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: authUrl.logout,
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
