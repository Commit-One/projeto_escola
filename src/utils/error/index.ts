export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  public response: string = "";

  constructor(field: string, message = "não encontrado(a)") {
    const value = `${field} ${message}`;
    super(value, 404);
    this.response = value;
  }
}

export class ValidationEmpty extends AppError {
  public response: string = "";

  constructor(field: string, message = "não pode ser vazio") {
    const value = `${field} ${message}`;
    super(value, 404);
    this.response = value;
  }
}
