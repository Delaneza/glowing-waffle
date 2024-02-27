import { AppError } from '@shared/errors/app-error.error'
import { User, UserDocument } from '../user.model'

const USER_NOT_FOUND_ERROR = (id: string) => ({
  message: `User not found with id: '${id}'`,
  name: 'UserNotFoundError',
  statusCode: 404,
})

export async function ShowUserUseCase(id: string): Promise<UserDocument> {
  const user = await User.findById(id)

  if (!user) {
    throw new AppError(USER_NOT_FOUND_ERROR(id))
  }

  return user.view(false)
}
