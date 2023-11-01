import { combineReducers, configureStore } from '@reduxjs/toolkit';

import UserReducer from './slices/UserSlice';
import ScoreReducer from './slices/ScoreSlice/ScoreSlice';
import GameStateReducer from './slices/GameStateSlice/GameStateSlice';
import LeaderboardReducer from './slices/LeaderboardSlice';

const rootReducer = combineReducers({
  user: UserReducer,
  score: ScoreReducer,
  gameState: GameStateReducer,
  leaderboard: LeaderboardReducer,
});

export function setupStore() {
  return configureStore({ reducer: rootReducer });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
