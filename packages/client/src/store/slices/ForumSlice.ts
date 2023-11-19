// For correct redux slice working
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import {
  createNewAnswer,
  createNewThread,
  deleteTread,
  getAllAnswer,
  getAllThread,
} from './ForumActionCreators';

export type TTread = {
  id: number;
  author: number;
  title: string;
  updatedAt: string;
  createdAt: string;
};

type ForumSlice = {
  tread: TTread[] | [];
  answer: any[] | [];
  isLoading: boolean;
  error: string | undefined;
};

const initialState: ForumSlice = {
  tread: [],
  answer: [],
  isLoading: false,
  error: '',
};

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewThread.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewThread.fulfilled, (state, action) => {
        state.tread = [...state.tread, JSON.parse(action.payload)];
        state.isLoading = false;
      })
      .addCase(createNewThread.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(getAllThread.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllThread.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tread = action.payload.data;
      })
      .addCase(getAllThread.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(deleteTread.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTread.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tread = state.tread.filter((item) => item.id !== Number(action.meta.arg));
      })
      .addCase(deleteTread.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getAllAnswer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAnswer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.answer = action.payload.data;
      })
      .addCase(getAllAnswer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(createNewAnswer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewAnswer.fulfilled, (state, action) => {
        state.isLoading = false;

        state.answer = [...state.answer, JSON.parse(action.payload)];
      })
      .addCase(createNewAnswer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

const { actions, reducer } = forumSlice;

export const forumActions = actions;
export default reducer;
