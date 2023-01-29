import { CustomError } from "./custom-error";
import { ValidationError } from "express-validator";

export class RequestValidationError extends CustomError {
  public statusCode = 400
  private errors: ValidationError[]

  constructor(errors: ValidationError[]) {
    super('Invalid request parameters')

    this.errors = errors

    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeErrors() {
    return this.errors.map(error => {
      return { message: error.msg, field: error.param }
    })
  }
}
