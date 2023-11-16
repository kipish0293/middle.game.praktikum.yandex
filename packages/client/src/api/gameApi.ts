import { localServerUrl } from '@app/const';

import { AnyObject } from '../types/AnyObject';

import { BaseApi } from './baseApi';

const enum GameApiRoutes {
  BASE = 'leaderboard',
  ALL = 'all',
}

const baseGameApi = new BaseApi({
  url: GameApiRoutes.BASE,
  apiBaseUrl: localServerUrl,
  withCredentials: true,
});

export class GameApi {
  public async sendScore(score: AnyObject) {
    return baseGameApi.post({ data: score });
  }

  public async getLeaderboard(leaderboardData: AnyObject) {
    return baseGameApi.post({ route: GameApiRoutes.ALL, data: leaderboardData });
  }
}
