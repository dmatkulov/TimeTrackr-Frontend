import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiURL } from '../common/constants';
import { RootState } from './store';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    prepareHeaders: (headers, { getState }) => {
      const state: RootState = getState();
      const token = state.auth.user?.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['User', 'Team', 'Project', 'Task', 'Position'],
});
