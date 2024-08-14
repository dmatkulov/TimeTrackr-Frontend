import axios from 'axios';
import { apiURL } from '../helpers/constants';
import { RootState } from '../store/store';
import { Store } from '@reduxjs/toolkit';

export const axiosService = axios.create({
  baseURL: apiURL,
});

export const addInterceptors = (store: Store<RootState>) => {
  axiosService.interceptors.request.use((config) => {
    const token = store.getState().auth.user?.token;
    config.headers.set('Authorization', token ? 'Bearer ' + token : undefined);

    return config;
  });
};
export default axiosService;
