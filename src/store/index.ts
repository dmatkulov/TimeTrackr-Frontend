import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiURL } from '../helpers/constants';
import { store } from './store';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    prepareHeaders: (headers) => {
      const token = store.getState().auth.user?.token;
      if (token) {
        headers.set('Authorization', token);
      }
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['User', 'Team', 'Project', 'Task', 'Position'],
});
