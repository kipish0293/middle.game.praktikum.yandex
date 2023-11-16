import { localServerUrl } from '@app/const';

import { AnyObject } from '../types/AnyObject';

import { BaseApi } from './baseApi';

type FormDataUser = AnyObject;
const enum UserApiRoutes {
  BASE = 'user',
  PROFILE = 'profile',
  PASSWORD = 'password',
  AVATAR = 'profile/avatar',
}

const baseUserApi = new BaseApi({
  url: UserApiRoutes.BASE,
  apiBaseUrl: localServerUrl,
  withCredentials: true,
});

export class UserApi {
  public async changeProfile(userData: FormDataUser) {
    return baseUserApi.put({ route: UserApiRoutes.PROFILE, data: userData });
  }

  public async changePassword(passwordData: FormDataUser) {
    return baseUserApi.put({ route: UserApiRoutes.PASSWORD, data: passwordData });
  }

  public async changeAvatar(formData: FormData) {
    return baseUserApi.put({ route: UserApiRoutes.AVATAR, data: formData });
  }
}
