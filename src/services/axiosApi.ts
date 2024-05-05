import axios from 'axios';
import { apiURL } from '../utils/constants';

export const axiosApi = axios.create({
  baseURL: apiURL,
});
