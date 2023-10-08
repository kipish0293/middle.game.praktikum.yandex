import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ScoreState = {
  score: number;
};

const initialState: ScoreState = {
  score: 0,
};

export const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    setScore(_state, action: PayloadAction<number>) {
      return { score: action.payload };
    },
  },
});

const { actions, reducer } = scoreSlice;

export const scoreActions = actions;
export default reducer;
