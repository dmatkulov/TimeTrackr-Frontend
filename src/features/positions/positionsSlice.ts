import { Position } from '../../types/types.position';
import { createSlice } from '@reduxjs/toolkit';
import { createPosition, fetchPositions } from './positionsThunks';
import { RootState } from '../../app/store';
import { message } from 'antd';

interface PositionsState {
  items: Position[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: PositionsState = {
  items: [],
  fetchLoading: false,
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
  },
});

export const positionsReducer = positionsSlice.reducer;
export const selectPositions = (state: RootState) => state.positions.items;
export const selectPositionsCreating = (state: RootState) =>
  state.positions.createLoading;
