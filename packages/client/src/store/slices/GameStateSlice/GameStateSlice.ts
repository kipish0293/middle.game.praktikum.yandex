import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GameState } from '@app/types';

type GameStateState = {
  gameState: GameState;
};

const initialState: GameStateState = {
  gameState: GameState.NotStarted,
};

export const gameStateSlice = createSlice({
  name: 'gameSate',
  initialState,
  reducers: {
    setGameState(_state, action: PayloadAction<GameState>) {
      return { gameState: action.payload };
    },
  },
});

export const gameStateActions = gameStateSlice.actions;
export default gameStateSlice.reducer;
