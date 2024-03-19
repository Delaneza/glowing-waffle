import { sign } from '@services/jwt'

type NewSessionDTO = {
  id: string
  email: string
  password: string
  view: Function
}

export async function newAuthUseCase(data: NewSessionDTO) {
  const token = await sign(data.id)

  return { token, user: data.view(false) }
}
