export const baseUrl = 'https://ya-praktikum.tech/api/v2';
export const staticBaseUrl = 'https://ya-praktikum.tech/api/v2/resources';

const releaseUri = 'https://alchemists-tanks-30.ya-praktikum.tech';
const localServerBaseUrl = __NODE_ENV__ === 'development' ? 'localhost' : releaseUri;
const serverPort = __NODE_ENV__ === 'development' ? __SERVER_PORT__ : 80;
export const localServerApi = `http://${localServerBaseUrl}:${serverPort}/api`;
export const localServerYandexApi = `http://${localServerBaseUrl}:${serverPort}/api/v2`;
