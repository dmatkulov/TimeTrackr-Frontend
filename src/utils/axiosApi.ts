import axios from 'axios';
import { apiURL } from './constants';

export const axiosApi = axios.create({
  baseURL: apiURL,
});
