import { CustomError } from "./custom-error"

export class NotFoundError extends CustomError {
  public statusCode = 404
  private reason = 'Not Found'

  constructor() {
    super('Route not found')

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors() {
    return [{ message: this.reason }]
  }
}
