import { localServerApi } from '@app/const';

import { AnyObject } from '../types/AnyObject';

import { BaseApi, Url } from './baseApi';

const enum ForumApiRoutes {
  BASE = 'forum',
  NEWTREAD = 'thread',
  ALLTREAD = 'thread/',
  NEWANSWER = 'answer',
}

const baseForumApi = new BaseApi({
  url: ForumApiRoutes.BASE,
  apiBaseUrl: localServerApi,
  withCredentials: true,
});

export class ForumApi {
  public async createNewThread(title: AnyObject) {
    return baseForumApi.post({ route: ForumApiRoutes.NEWTREAD, data: title });
  }

  public async getAllThread() {
    return baseForumApi.get({ route: ForumApiRoutes.ALLTREAD });
  }

  public async deleteTread(threadId: Url) {
    return baseForumApi.delete({ route: `thread/${threadId}` });
  }

  public async getAllAnswer(threadId: Url) {
    return baseForumApi.get({ route: `answer/${threadId}` });
  }

  public async createNewAnswer(body: AnyObject) {
    return baseForumApi.post({ route: ForumApiRoutes.NEWANSWER, data: body });
  }
}
