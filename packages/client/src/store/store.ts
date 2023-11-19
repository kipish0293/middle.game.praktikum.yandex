import { combineReducers, configureStore } from '@reduxjs/toolkit';

import UserReducer from './slices/UserSlice';
import ScoreReducer from './slices/ScoreSlice/ScoreSlice';
import GameStateReducer from './slices/GameStateSlice/GameStateSlice';
import LeaderboardReducer from './slices/LeaderboardSlice';
import ForumReducer from './slices/ForumSlice';

export const rootReducer = combineReducers({
  user: UserReducer,
  score: ScoreReducer,
  gameState: GameStateReducer,
  leaderboard: LeaderboardReducer,
  forum: ForumReducer,
});

type State = ReturnType<typeof rootReducer>;

let preloadedState: State | undefined;

if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  preloadedState = { ...window.__PRELOADED_STATE__ };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  delete window.__PRELOADED_STATE__;
}

export function setupStore(ssrPreloadedState?: State) {
  if (!preloadedState) {
    preloadedState = ssrPreloadedState;
  }
  return configureStore({ reducer: rootReducer, preloadedState: preloadedState || {} });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
