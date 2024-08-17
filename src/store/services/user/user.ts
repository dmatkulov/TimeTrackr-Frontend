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
    getAllUser: build.query<User[], void>({
      query: () => userUrl.get,
    }),

    getUser: build.query<User, string>({
      query: (id) => userUrl.getOne + id,
      providesTags: ['User'],
    }),

    updateUser: build.mutation<AuthResponse, UpdateUserArg>({
      query: ({ id, mutation }) => {
        const formData = new FormData();

        formData.append('email', mutation.email);
        formData.append('firstname', mutation.firstname);
        formData.append('lastname', mutation.lastname);

        if (mutation.phoneNumber) {
          formData.append('phoneNumber', mutation.phoneNumber);
        }

        if (mutation.photo) {
          formData.append('photo', mutation.photo);
        }

        return {
          url: userUrl.update + id,
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
  useGetAllUserQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdatePhotoMutation,
} = userApi;
