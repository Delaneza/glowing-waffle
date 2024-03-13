import { CustomError} from "./customError";

export class ExpiredTokenError extends CustomError {
  constructor() {
    super('TokenExpiredError', 440)
  }
}