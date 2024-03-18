import { sign } from '@services/auth/jwt'

type NewSessionDTO = {
  id: string
  email: string
  password: string
  view: Function
}

export async function newSessionUseCase(data: NewSessionDTO) {
  const token = await sign(data.id)

  return { token, user: data.view(false) }
}
