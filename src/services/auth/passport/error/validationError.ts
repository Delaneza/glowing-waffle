import { CustomError } from './customError'

export class ValidationError extends CustomError {
  constructor() {
    super('Erro de autenticação', 400)
  }
}
