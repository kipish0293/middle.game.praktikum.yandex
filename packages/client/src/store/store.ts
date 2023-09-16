import { combineReducers, configureStore } from '@reduxjs/toolkit';

import CounterReducer from './slices/CounterSlice';

const rootReducer = combineReducers({
  counter: CounterReducer,
});

export function setupStore() {
  return configureStore({ reducer: rootReducer });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
