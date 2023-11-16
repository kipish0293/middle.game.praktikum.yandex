import fetch from 'cross-fetch';

const { YANDEX_API_URL } = process.env;
export const getUserInfo = async (cookie: string | string[]) =>
  fetch(`${YANDEX_API_URL}/api/v2/auth/user`, {
    headers: { 'Content-Type': 'application/json; charset=utf-8', cookie: cookie.toString() },
  }).then((response) => {
    if (!response.ok) {
      return null;
    }
    return response.json();
  });
