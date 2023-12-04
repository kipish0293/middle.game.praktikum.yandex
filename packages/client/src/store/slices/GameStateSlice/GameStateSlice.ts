// For correct redux slice working
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GameState } from '@app/types';

type GameStateState = {
  level: number;
  gameState: GameState;
};

const initialState: GameStateState = {
  level: 1,
  gameState: GameState.NotStarted,
};

export const gameStateSlice = createSlice({
  name: 'gameSate',
  initialState,
  reducers: {
    upGameLevel(state) {
      state.level += 1;
    },
    resetGameLevel(state) {
      state.level = 1;
    },
    setGameState(state, action: PayloadAction<GameState>) {
      state.gameState = action.payload;
    },
  },
});

export const gameStateActions = gameStateSlice.actions;
export default gameStateSlice.reducer;
