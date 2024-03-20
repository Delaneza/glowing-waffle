import { AppError } from '@shared/errors/app-error.class'
import { User } from '../../models'
import { UserDocument } from '../../models/user.model'

export type CreateUserDTO = {
  email: string
  password: string
  name: string
}

export async function createUserUseCase(data: CreateUserDTO): Promise<UserDocument> {
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
