import { createAsyncThunk } from '@reduxjs/toolkit';
import { Position, PositionMutation } from '../../types/types.position';
import axiosApi from '../../utils/axiosApi';
import { httpRoutes } from '../../utils/routes';
import { GlobalError, GlobalMessage } from '../../types/types.global';
import { isAxiosError } from 'axios';

export const createPosition = createAsyncThunk<
  GlobalMessage,
  PositionMutation,
  { rejectValue: GlobalError }
>('positions/createOne', async (mutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<GlobalMessage>(
      httpRoutes.newPosition,
      mutation,
    );
    return response.data;
  } catch (e) {
    if (
      isAxiosError(e) &&
      e.response?.status === 400 &&
      e.response?.data.message
    ) {
      return rejectWithValue(e.response);
    }

    throw e;
  }
});
export const fetchPositions = createAsyncThunk<Position[]>(
  'positions/fetchAll',
  async () => {
    const response = await axiosApi.get(httpRoutes.positions);
    return response.data ?? [];
  },
);
