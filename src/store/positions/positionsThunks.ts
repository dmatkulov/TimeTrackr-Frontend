import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Position,
  PositionMutation,
  UpdatePositionArg,
} from '../../types/types.position';
import axiosService from '../../services/axios.service';
import { apiRoutes } from '../../services/routes.service';
import { BadRequestError, GlobalMessage } from '../../types/types.global';
import { isAxiosError } from 'axios';

export const createPosition = createAsyncThunk<
  GlobalMessage,
  PositionMutation,
  { rejectValue: BadRequestError }
>('positions/createOne', async (mutation, { rejectWithValue }) => {
  try {
    const response = await axiosService.post<GlobalMessage>(
      apiRoutes.newPosition,
      mutation,
    );
    return response.data;
  } catch (e) {
    if (
      isAxiosError(e) &&
      e.response?.status &&
      e.response?.status === 400 &&
      e.response?.data.message
    ) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});
export const fetchPositions = createAsyncThunk<Position[]>(
  'positions/fetchAll',
  async () => {
    const response = await axiosService.get(apiRoutes.positions);
    return response.data ?? [];
  },
);

export const fetchOnePosition = createAsyncThunk<Position, string>(
  'positions/fetchOne',
  async (id) => {
    const response = await axiosService.get<Position>(
      apiRoutes.positionById + id,
    );
    return response.data;
  },
);

export const updatePosition = createAsyncThunk<
  GlobalMessage,
  UpdatePositionArg,
  { rejectValue: BadRequestError }
>('positions/updateOne', async ({ id, mutation }, { rejectWithValue }) => {
  try {
    const response = await axiosService.patch<GlobalMessage>(
      apiRoutes.editPosition + id,
      mutation,
    );
    return response.data;
  } catch (e) {
    if (
      isAxiosError(e) &&
      e.response?.status &&
      e.response?.status === 400 &&
      e.response?.data.message
    ) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const deletePosition = createAsyncThunk<GlobalMessage, string>(
  'positions/deleteOne',
  async (id) => {
    const response = await axiosService.delete<GlobalMessage>(
      `${apiRoutes.deletePositions}/${id}`,
    );
    return response.data;
  },
);
