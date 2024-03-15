import { AppError } from './app-error.class'

export function authenticationError(entity: string, id: string, message?: string) {
  const entityCapitalized = capitalize(entity)

  return new AppError({
    message: message ?? `Usuário ou senha inválidos`,
    statusCode: 401,
    name: `${entityCapitalized}AuthenticationError`,
  })
}


export function AuthorizationError(entity: string, id: string, message?: string) {
  const entityCapitalized = capitalize(entity)

  return new AppError({
    message: message ?? `Usuário não autorizado`,
    statusCode: 401,
    name: `${entityCapitalized}AuthenticationError`,
  })
}

export function ExpiredTokenError(entity: string, id: string, message?: string) {
  const entityCapitalized = capitalize(entity)

  return new AppError({
    message: message ?? `Token expiradoo`,
    statusCode: 440,
    name: `${entityCapitalized}TokenExpiredError`,
  })
}


const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
