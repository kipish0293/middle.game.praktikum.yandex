import { createAsyncThunk } from '@reduxjs/toolkit';

import { ForumApi } from '../../api/forumApi';
import { AnyObject } from '../../types/AnyObject';
import { Url } from '../../api/baseApi';

const forumApi = new ForumApi();

export const createNewThread = createAsyncThunk('createNewThread', async (title: AnyObject) =>
  forumApi.createNewThread(title),
);
export const getAllThread = createAsyncThunk('getAllThread', async () => forumApi.getAllThread());
export const deleteTread = createAsyncThunk('deleteTread', async (threadId: Url) =>
  forumApi.deleteTread(threadId),
);
export const getAllAnswer = createAsyncThunk('getAllAnswer', async (threadId: Url) =>
  forumApi.getAllAnswer(threadId),
);
export const createNewAnswer = createAsyncThunk('createNewAnswer', async (body: AnyObject) =>
  forumApi.createNewAnswer(body),
);
