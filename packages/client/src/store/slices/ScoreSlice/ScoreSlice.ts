// For correct redux slice working
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { sendScore } from '../GameActionCreators';

type ScoreState = {
  score: number;
  isLoading: boolean;
  error: string | undefined;
};

const initialState: ScoreState = {
  score: 0,
  isLoading: false,
  error: '',
};

export const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    setScore(state, action: PayloadAction<number>): void {
      state.score = action.payload;
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
      });
  },
});

const { actions, reducer } = scoreSlice;

export const scoreActions = actions;
export default reducer;
