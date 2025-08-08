// A custom error class for me to throw and for the error handler to use
export class AppError extends Error {
  public code: string;
  public details?: Record<string, any>;

  constructor(
    public statusCode: number,
    public message: string,
    options?: {
      //code?: string,
      details?: Record<string, any>;
    }
  ) {
    super(message);
    this.name = "AppError";
    //this.code = options?.code || this.generateErrorCode(message);
    this.details = options?.details;
    Error.captureStackTrace(this, this.constructor);
  }

  //Uncomment if this.generateErrorCode(message) earlier becomes relevant
  // private generateErrorCode(message: string): string {
  //   return message
  //     .toUpperCase()
  //     .replace(/[^A-Z0-9]+/g, '_')
  //     .replace(/(^_+|_+$)/g, '');
  // }
}

//export class ValidationError
//export class DatabaseError
//export class AuthError
//etc
