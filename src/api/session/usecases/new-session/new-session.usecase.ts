import { sign } from '@services/auth/jwt'
import { invalidCredentialsError } from '@shared/errors/default-errors.error'
import { User } from '@src/api/user/models'

type NewSessionDTO = {
  email: string
  password: string
}

export async function newSessionUseCase(data: NewSessionDTO) {
  const user = await User.findOne({
    email: data.email,
    password: data.password,
  })

  if (!user) {
    throw invalidCredentialsError()
  }

  if (user.password !== data.password) {
    throw invalidCredentialsError()
  }

  const token = await sign(user.id)

  return { token, user: user.view(false) }
}
