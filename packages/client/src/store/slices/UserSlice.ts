// For correct redux slice working
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { User } from '@app/types';

import { changeAvatar, changeProfile, getUser, signin, signup, logout } from './UserActionCreators';

interface UserState {
  user: User | undefined;
  isLoading: boolean;
  error: string | undefined;
  isLoggedIn: string;
}

const initialState: UserState = {
  user: undefined,
  isLoading: false,
  error: '',
  isLoggedIn: 'pending',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = 'pending';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = 'true';
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = 'false';
        state.error = action.error.message;
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = 'pending';
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = 'false';
        state.user = undefined;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signup.rejected, (state, action) => {
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
