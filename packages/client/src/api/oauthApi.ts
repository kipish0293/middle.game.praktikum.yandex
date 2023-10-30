import { BaseApi } from './baseApi';

type PostData = {
  code: string;
  redirect_uri: string;
};

const { origin } = window.location;

const enum OauthApiRoutes {
  GET_OAUTH_SERVICE_ID = 'oauth/yandex/service-id',
  POST_OAUTH_SERVICE = 'oauth/yandex',
}

const baseUserApi = new BaseApi('', true);

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
