import { combineReducers, configureStore } from '@reduxjs/toolkit';

import CounterReducer from './slices/CounterSlice';
import UserReducer from './slices/UserSlice';

const rootReducer = combineReducers({
  counter: CounterReducer,
  user: UserReducer,
});

export function setupStore() {
  return configureStore({ reducer: rootReducer });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
