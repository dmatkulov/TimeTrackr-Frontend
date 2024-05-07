import { Position } from '../../types/types.position';
import { createSlice } from '@reduxjs/toolkit';
import { fetchPositions } from './positionsThunks';
import { RootState } from '../../app/store';

interface PositionsState {
  items: Position[];
  fetchLoading: boolean;
}

const initialState: PositionsState = {
  items: [],
  fetchLoading: false,
};

export const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPositions.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchPositions.fulfilled, (state, { payload: items }) => {
        state.fetchLoading = false;
        state.items = items;
      })
      .addCase(fetchPositions.pending, (state) => {
        state.fetchLoading = false;
      });
  },
});

export const positionsReducer = positionsSlice.reducer;
export const selectPositions = (state: RootState) => state.positions.items;
