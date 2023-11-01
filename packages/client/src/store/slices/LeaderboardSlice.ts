// For correct redux slice working
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { createLeaderboard } from '@app/utils/createLeaderboard';

import { getLeaderboard } from '@app/store';
import { Leaderbord } from '@app/types';

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
