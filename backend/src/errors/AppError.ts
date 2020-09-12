class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public appModule: string;

  constructor(message: string, statusCode = 400, appModule: string) {
    this.message = message;
    this.statusCode = statusCode;
    this.appModule = appModule;
  }
}

export default AppError;
