export class ApiError extends Error {
  statusCode: number;
  statusMessage: string;

  constructor(statusCode: number, statusMessage: string) {
    super(statusMessage);
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
  }

  static UnauthorizedError() {
    return new ApiError(403, 'Unauthorized');
  }

  static BadRequest(message: string) {
    return new ApiError(400, message);
  }

  static NotFoundError(message: string) {
    return new ApiError(404, message);
  }
}
