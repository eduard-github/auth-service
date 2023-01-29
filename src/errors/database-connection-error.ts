import { CustomError } from "./custom-error"

export class DatabaseConnectionError extends CustomError {
  public statusCode = 500
  private reason = 'Error connecting to database'

  constructor() {
    super('Error connecting to db')

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeErrors() {
    return [{ message: this.reason }]
  }
}
