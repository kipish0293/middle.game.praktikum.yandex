import { BASE_URL } from '@app/utils';

type FormDataUser = {
  [key: string]: string;
};
export class UserApi {
  // eslint-disable-next-line class-methods-use-this
  private async handleResponse(response: Response) {
    if (response.status !== 200) {
      const errorMessage = `HTTP Error: ${response.status}`;
      throw new Error(errorMessage);
    }
    return response.json();
  }

  public async fetchData() {
    try {
      const response = await fetch(`${BASE_URL}/auth/user`, {
        credentials: 'include',
      });
      return await this.handleResponse(response);
    } catch (error) {
      if (error instanceof Error) {
        throw new TypeError(`API Error: ${error.message}`);
      }
      return {};
    }
  }

  public async fetchDataUser(headers: FormDataUser, user: FormDataUser) {
    try {
      const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: 'POST',
        headers,
        body: JSON.stringify(user),
        credentials: 'include',
      });
      return await this.handleResponse(response);
    } catch (error) {
      if (error instanceof Error) {
        throw new TypeError(`API Error: ${error.message}`);
      }
      return {};
    }
  }

  public async changeProfile(headers: FormDataUser, userData: FormDataUser) {
    try {
      const response = await fetch(`${BASE_URL}/user/profile`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(userData),
        credentials: 'include',
      });
      return await this.handleResponse(response);
    } catch (error) {
      if (error instanceof Error) {
        throw new TypeError(`API Error: ${error.message}`);
      }
      return {};
    }
  }

  public async changePassword(headers: FormDataUser, passwordData: FormDataUser) {
    try {
      const response = await fetch(`${BASE_URL}/user/password`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(passwordData),
        credentials: 'include',
      });
      return await this.handleResponse(response);
    } catch (error) {
      if (error instanceof Error) {
        throw new TypeError(`API Error: ${error.message}`);
      }
      return {};
    }
  }

  public async changeAvatar(formData: FormData) {
    try {
      const response = await fetch(`${BASE_URL}/user/profile/avatar`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      });
      return await this.handleResponse(response);
    } catch (error) {
      if (error instanceof Error) {
        throw new TypeError(`API Error: ${error.message}`);
      }
      return {};
    }
  }
}
