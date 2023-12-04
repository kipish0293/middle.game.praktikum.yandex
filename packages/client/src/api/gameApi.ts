import { localServerYandexApi, teamName } from '@app/const';

import { AnyObject } from '../types/AnyObject';

import { BaseApi } from './baseApi';

const enum GameApiRoutes {
  BASE = 'leaderboard',
  ALL = 'all',
}

const baseGameApi = new BaseApi({
  url: GameApiRoutes.BASE,
  apiBaseUrl: localServerYandexApi,
  withCredentials: true,
});

export class GameApi {
  public async sendScore(score: AnyObject) {
    return baseGameApi.post({ data: score });
  }

  public async getTeamLeaderboard(leaderboardData: AnyObject) {
    return baseGameApi.post({ route: teamName, data: leaderboardData });
  }

  public async getLeaderboard(leaderboardData: AnyObject) {
    return baseGameApi.post({ route: GameApiRoutes.ALL, data: leaderboardData });
  }
}
