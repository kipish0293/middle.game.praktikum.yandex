import { createAsyncThunk } from '@reduxjs/toolkit';

import { UserApi, AuthApi } from '@app/api';
import { LoginData, SignUpData } from '@app/types';

import { AnyObject } from '../../types/AnyObject';

const userApi = new UserApi();
const authApi = new AuthApi();

export const getUser = createAsyncThunk('getUser', async () => authApi.getUser());
// запрос для получения куков
export const signin = createAsyncThunk('signin', async (loginData: LoginData) =>
  authApi.signin(loginData),
);

export const signup = createAsyncThunk('signup', async (signupData: SignUpData) =>
  authApi.signup(signupData),
);

export const logout = createAsyncThunk('logout', async () => authApi.logout());

export const changeProfile = createAsyncThunk('changeProfile', async (userData: AnyObject) =>
  userApi.changeProfile(userData),
);

export const changePassword = createAsyncThunk('changeProfile', async (passwordData: AnyObject) =>
  userApi.changePassword(passwordData),
);

export const changeAvatar = createAsyncThunk('changeAvatar', async (formData: FormData) =>
  userApi.changeAvatar(formData),
);
