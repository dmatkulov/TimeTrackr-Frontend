import { Position } from '../../types/types.position';
import { createSlice } from '@reduxjs/toolkit';
import {
  createPosition,
  fetchOnePosition,
  fetchPositions,
} from './positionsThunks';
import { RootState } from '../../app/store';
import { message } from 'antd';

interface PositionsState {
  items: Position[];
  item: Position | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
}

const initialState: PositionsState = {
  items: [],
  item: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
};

export const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPosition.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createPosition.fulfilled, (state, { payload: data }) => {
        state.createLoading = false;

        if (data.message) {
          void message.success(data.message);
        }
      })
      .addCase(createPosition.rejected, (state, { payload: error }) => {
        state.createLoading = false;

        void message.error(error?.data.message);
      });
    builder
      .addCase(fetchPositions.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchPositions.fulfilled, (state, { payload: items }) => {
        state.fetchLoading = false;
        state.items = items;
      })
      .addCase(fetchPositions.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(fetchOnePosition.pending, (state) => {
        state.fetchOneLoading = true;
      })
      .addCase(fetchOnePosition.fulfilled, (state, { payload: item }) => {
        state.fetchOneLoading = false;
        state.item = item;
      })
      .addCase(fetchOnePosition.rejected, (state) => {
        state.fetchOneLoading = false;
      });
  },
});

export const positionsReducer = positionsSlice.reducer;
export const selectPositions = (state: RootState) => state.positions.items;
export const selectOnePosition = (state: RootState) => state.positions.item;
export const selectPositionsCreating = (state: RootState) =>
  state.positions.createLoading;

export const selectPositionsLoading = (state: RootState) =>
  state.positions.fetchLoading;
export const selectOnePositionLoading = (state: RootState) =>
  state.positions.fetchOneLoading;
