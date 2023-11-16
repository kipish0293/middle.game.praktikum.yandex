export class ValidationError extends Error {
  public errCode: number;

  public constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    this.errCode = 403;
  }
}
