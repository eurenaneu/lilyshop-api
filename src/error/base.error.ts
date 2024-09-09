import { HttpStatus } from "../utils/httpResponse";

export class BaseError extends Error {
  public statusCode: HttpStatus;

  constructor(message: string, statusCode: HttpStatus) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
