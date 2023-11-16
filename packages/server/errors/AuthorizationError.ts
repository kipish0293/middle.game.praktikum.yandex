export class AuthorizationError extends Error {
  public errCode: number;

  public constructor(message: string) {
    super(message);
    this.name = 'AuthorizationError';
    this.errCode = 401;
  }
}
