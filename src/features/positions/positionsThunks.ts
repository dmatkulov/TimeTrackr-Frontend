import { createAsyncThunk } from '@reduxjs/toolkit';
import { Position } from '../../types/types.position';
import axiosApi from '../../utils/axiosApi';
import { httpRoutes } from '../../utils/routes';

export const fetchPositions = createAsyncThunk<Position[]>(
  'positions/fetchAll',
  async () => {
    const response = await axiosApi.get(httpRoutes.positions);
    return response.data ?? [];
  },
);
