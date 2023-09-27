import { createAsyncThunk } from '@reduxjs/toolkit';

import { UserApi } from '@app/api';

type FormDataUser = {
  [key: string]: string;
};

const headers = {
  'Content-Type': 'application/json;charset=utf-8',
};

const api = new UserApi();

export type TUser = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
};

export const fetchData = createAsyncThunk('fetchData', async () => api.fetchData());

// данные для запроса
const user = {
  login: 'lertwq',
  password: 'Aswee11111',
};

// запрос для получения куков
export const fetchDataUser = createAsyncThunk('fetchDataUser', async () =>
  api.fetchDataUser(headers, user),
);

export const changeProfile = createAsyncThunk('changeProfile', async (userData: FormDataUser) =>
  api.changeProfile(headers, userData),
);

export const changePassword = createAsyncThunk(
  'changeProfile',
  async (passwordData: FormDataUser) => api.changePassword(headers, passwordData),
);

export const changeAvatar = createAsyncThunk('changeAvatar', async (formData: FormData) =>
  api.changeAvatar(formData),
);
