import { Position } from '../../types/types.position';
import { createSlice } from '@reduxjs/toolkit';
import {
  createPosition,
  deletePosition,
  fetchOnePosition,
  fetchPositions,
  updatePosition,
} from './positionsThunks';
import { RootState } from '../../app/store';
import { message } from 'antd';

interface PositionsState {
  items: Position[];
  item: Position | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
}

const initialState: PositionsState = {
  items: [],
  item: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
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

        void message.error(error?.message);
      });

    builder
      .addCase(fetchPositions.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchPositions.fulfilled, (state, { payload: data }) => {
        state.fetchLoading = false;
        state.items = data;
      })
      .addCase(fetchPositions.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(fetchOnePosition.pending, (state) => {
        state.fetchOneLoading = true;
      })
      .addCase(fetchOnePosition.fulfilled, (state, { payload: data }) => {
        state.fetchOneLoading = false;
        state.item = data;
      })
      .addCase(fetchOnePosition.rejected, (state) => {
        state.fetchOneLoading = false;
      });

    builder
      .addCase(updatePosition.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updatePosition.fulfilled, (state, { payload: data }) => {
        state.updateLoading = false;
        void message.success(data.message);
      })
      .addCase(updatePosition.rejected, (state, { payload: error }) => {
        state.updateLoading = false;

        void message.error(error?.message);
      });

    builder
      .addCase(deletePosition.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deletePosition.fulfilled, (state, { payload: data }) => {
        state.deleteLoading = false;
        void message.success(data.message);
      })
      .addCase(deletePosition.rejected, (state) => {
        state.deleteLoading = false;
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

export const selectPositionDeleting = (state: RootState) =>
  state.positions.deleteLoading;
