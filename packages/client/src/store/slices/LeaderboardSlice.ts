// For correct redux slice working
/* eslint-disable no-param-reassign */
import { createLeaderboard } from '@app/utils/createLeaderboard';
import { createSlice } from '@reduxjs/toolkit';

import { Leaderbord } from '@app/types';

import { getLeaderboard } from './GameActionCreators';

type LeaderboardState = {
  data: Leaderbord[] | undefined;
  isLoading: boolean;
  error: string | undefined;
};
const initialState: LeaderboardState = {
  data: undefined,
  isLoading: false,
  error: '',
};

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLeaderboard.fulfilled, (state, action) => {
        state.data = createLeaderboard(action.payload);
        state.isLoading = false;
      })
      .addCase(getLeaderboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
const { actions, reducer } = leaderboardSlice;
export const leaderboardActions = actions;
export default reducer;
