/* eslint-disable unicorn/no-negated-condition */
import { localServerUrl } from '@app/const';

import { BaseApi } from './baseApi';

type PostData = {
  code: string;
  redirect_uri: string;
};

let origin: Location | string = '';
if (typeof window !== 'undefined') {
  origin = window.location.origin;
}

const enum OauthApiRoutes {
  GET_OAUTH_SERVICE_ID = 'oauth/yandex/service-id',
  POST_OAUTH_SERVICE = 'oauth/yandex',
}

const baseUserApi = new BaseApi({ url: '', apiBaseUrl: localServerUrl, withCredentials: true });

export class OauthApi {
  public async getOauthServiceId() {
    // eslint-disable-next-line max-len
    const withQueryParameters = `${OauthApiRoutes.GET_OAUTH_SERVICE_ID}/?redirect_uri=${origin}/signin`;
    return baseUserApi.get({ route: withQueryParameters });
  }

  public async postOauthServiceByCode(data: PostData) {
    return baseUserApi.post({ route: OauthApiRoutes.POST_OAUTH_SERVICE, data });
  }
}
