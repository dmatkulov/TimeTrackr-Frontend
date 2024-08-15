import { api } from '../../index';
import {
  AuthResponse,
  UpdatePhotoArg,
  UpdateUserArg,
  User,
} from '../../../types/types.user';
import { userRoute } from '../../../containers/routes.service';

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, string>({
      query: (id) => userRoute.user + id,
      providesTags: ['User'],
    }),
    updateUser: build.mutation<AuthResponse, UpdateUserArg>({
      query: ({ id, mutation }) => {
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

        return {
          url: userRoute.updateUser + id,
          method: 'PATCH',
          body: formData,
        };
      },
      invalidatesTags: ['User'],
    }),
    updatePhoto: build.mutation<AuthResponse, UpdatePhotoArg>({
      query: ({ id, mutation }) => {
        const formData = new FormData();
        if (mutation.photo) {
          formData.append('photo', mutation.photo);
        }
        return {
          url: userRoute.updatePhoto + id,
          method: 'PATCH',
          body: formData,
        };
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdatePhotoMutation,
} = userApi;
