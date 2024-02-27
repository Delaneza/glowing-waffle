import { AppError } from '@shared/errors/app-error.error'
import { User, UserDocument } from '../user.model'

export type CreateUserDTO = {
  email: string
  password: string
  name: string
}

export async function CreateUserUseCase(data: CreateUserDTO): Promise<UserDocument> {
  const userAlreadyExists = await User.findOne({ email: data.email })

  if (userAlreadyExists) {
    throw new AppError({
      message: `User already exists with email: '${data.email}'`,
      name: 'UserAlreadyExistsError',
      statusCode: 409,
    })
  }

  const user = await User.create(data)

  return user.view(false)
}
