import { CustomError } from './customError'

export class AuthorizationError extends CustomError {
  constructor() {
    super('Usuário não autorizado', 401)
  }
}
