// For correct redux slice working
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getLeaderboard, getTeamLeaderboard, sendScore } from '../GameActionCreators';

type ScoreState = {
  score: number;
  highestScore: number;
  isLoading: boolean;
  error: string | undefined;
};

const initialState: ScoreState = {
  score: 0,
  highestScore: 0,
  isLoading: false,
  error: '',
};

export const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    updateScore(state, action: PayloadAction<number>): void {
      state.score += action.payload;
    },
    resetScore(state): void {
      state.score = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendScore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendScore.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendScore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getTeamLeaderboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeamLeaderboard.fulfilled, (state, action) => {
        state.highestScore = JSON.parse(action.payload)[0].data.score as number;
        state.isLoading = false;
      })
      .addCase(getLeaderboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

const { actions, reducer } = scoreSlice;

export const scoreActions = actions;
export default reducer;
