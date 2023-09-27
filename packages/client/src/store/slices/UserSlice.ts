// For correct redux slice working
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { changeAvatar, changeProfile, fetchData, fetchDataUser, TUser } from './UserActionCreators';

interface UserState {
  user: TUser | undefined;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: UserState = {
  user: undefined,
  isLoading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(fetchDataUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDataUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchDataUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(changeProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(changeProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(changeAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeAvatar.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(changeAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
