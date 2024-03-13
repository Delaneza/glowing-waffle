import { CustomError } from "./customError"

export class AuthenticationError extends CustomError {
  constructor() {
    super('Usuário ou senha inválidos', 401)
  }
}

