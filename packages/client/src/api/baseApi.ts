import { baseUrl } from '@app/const';

import { AnyObject } from '../types/AnyObject';

const jsonHeader = { 'Content-Type': 'application/json; charset=utf-8' };

const enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Url = URL | string;

type RequestData = AnyObject | FormData;
export class BaseApi {
  private readonly _baseUrl: string | URL;

  private readonly _withCredentials: boolean;

  public constructor(url: string | URL, withCredentials = false) {
    this._baseUrl = `${url ? `${baseUrl}/${url}` : `${baseUrl}`}`;
    this._withCredentials = withCredentials;
  }

  private get credentials(): 'include' | 'omit' {
    return `${this._withCredentials ? 'include' : 'omit'}`;
  }

  private getFetchOptions = (method: Method, data?: RequestData) => ({
    method,
    credentials: this.credentials,
    headers: data instanceof FormData ? undefined : jsonHeader,
    body: data && data instanceof FormData ? data : data ? JSON.stringify(data) : undefined,
  });

  private checkResponse(response: Response) {
    if (response.status !== 200) {
      response.text().then((text: string) => {
        throw new Error(text);
      });
    }
    return response;
  }

  public async post({ route, data }: { route: Url; data?: RequestData }) {
    try {
      const response = await fetch(
        `${this._baseUrl}/${route}`,
        this.getFetchOptions(Method.POST, data),
      ).catch((error) => {
        throw new Error(error);
      });
      return await this.checkResponse(response).text();
    } catch (error) {
      if (error instanceof Error) {
        throw new TypeError(`API Error: ${error.message}`);
      }
      throw new Error('Unknown API error');
    }
  }

  public async get({ route }: { route: Url }) {
    try {
      const response = await fetch(
        `${this._baseUrl}/${route}`,
        this.getFetchOptions(Method.GET),
      ).catch((error) => {
        throw new Error(error);
      });
      return await this.checkResponse(response).json();
    } catch (error) {
      if (error instanceof Error) {
        throw new TypeError(`API Error: ${error.message}`);
      }
      throw new Error('Unknown API error');
    }
  }

  public async put({ route, data }: { route: Url; data: RequestData }) {
    try {
      const response = await fetch(
        `${this._baseUrl}/${route}`,
        this.getFetchOptions(Method.PUT, data),
      ).catch((error) => {
        throw new Error(error);
      });
      return await this.checkResponse(response).json();
    } catch (error) {
      if (error instanceof Error) {
        throw new TypeError(`API Error: ${error.message}`);
      }
      throw new Error('Unknown API error');
    }
  }

  public async delete({ route, data }: { route: Url; data: RequestData }) {
    try {
      const response = await fetch(
        `${this._baseUrl}/${route}`,
        this.getFetchOptions(Method.DELETE, data),
      ).catch((error) => {
        throw new Error(error);
      });
      return await this.checkResponse(response).json();
    } catch (error) {
      if (error instanceof Error) {
        throw new TypeError(`API Error: ${error.message}`);
      }
      throw new Error('Unknown API error');
    }
  }
}
