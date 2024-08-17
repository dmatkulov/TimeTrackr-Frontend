// import { createSlice } from '@reduxjs/toolkit';
// import { teamApi } from './team';
// import { message } from 'antd';
//
// const initialState = {};
// const teamSlice = createSlice({
//   name: 'team',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addMatcher(
//       teamApi.endpoints.createTeam.matchFulfilled,
//       (_state, { payload: data }) => {
//         void message.success(data.message);
//       },
//     );
//   },
// });
//
// export const teamReducer = teamSlice.reducer;
