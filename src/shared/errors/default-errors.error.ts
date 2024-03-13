import { AppError } from './app-error.class'

export function notFoundError(entity: string, id: string, message?: string) {
  const entityCapitalized = capitalize(entity)

  return new AppError({
    message: message ?? `${entityCapitalized} com o id "${id}" não encontrado(a)`,
    statusCode: 404,
    name: `${entityCapitalized}NotFoundError`,
  })
}

export function conflictError(entity: string, message?: string) {
  const entityCapitalized = capitalize(entity)

  return new AppError({
    message: message ?? `${entityCapitalized} já existe`,
    statusCode: 409,
    name: `${entityCapitalized}ConflictError`,
  })
}

export function invalidCredentialsError() {
  return new AppError({
    message: 'E-mail ou senha inválidos',
    name: 'InvalidCredentialsError',
    statusCode: 401,
  })
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
