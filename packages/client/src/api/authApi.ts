import { LoginData, SignUpData } from '@app/types';
import { localServerUrl } from '@app/const';

import { BaseApi } from './baseApi';

const enum AuthApiRoutes {
  BASE = 'auth',
  SIGNIN = 'signin',
  SIGNUP = 'signup',
  USER = 'user',
  LOGOUT = 'logout',
}

const baseUserApi = new BaseApi({
  url: AuthApiRoutes.BASE,
  apiBaseUrl: localServerUrl,
  withCredentials: true,
});

export class AuthApi {
  public async signin(loginData: LoginData) {
    return baseUserApi.post({ route: AuthApiRoutes.SIGNIN, data: loginData });
  }

  public async getUser() {
    return baseUserApi.get({ route: AuthApiRoutes.USER });
  }

  public async signup(signupData: SignUpData) {
    return baseUserApi.post({ route: AuthApiRoutes.SIGNUP, data: signupData });
  }

  public async logout() {
    return baseUserApi.post({ route: AuthApiRoutes.LOGOUT });
  }
}
