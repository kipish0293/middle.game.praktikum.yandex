import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GameState } from '@app/types';

type GameStateState = {
  gameSate: GameState;
};

const initialState: GameStateState = {
  gameSate: GameState.NotStarted,
};

export const gameStateSlice = createSlice({
  name: 'gameSate',
  initialState,
  reducers: {
    setGameState(_state, action: PayloadAction<GameState>) {
      return { gameSate: action.payload };
    },
  },
});

export const gameStateActions = gameStateSlice.actions;
export default gameStateSlice.reducer;
