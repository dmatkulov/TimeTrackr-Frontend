import { api } from '../../index';
import {
  AuthResponse,
  UpdatePhotoArg,
  UpdateUserArg,
  User,
} from '../../../types/types.user';
import { userUrl } from '../../../common/routes';

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, string>({
      query: (id) => userUrl.user + id,
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
          url: userUrl.updateUser + id,
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
          url: userUrl.updatePhoto + id,
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
