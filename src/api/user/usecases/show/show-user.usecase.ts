import { notFoundError } from '@shared/errors/default-errors.error'
import { User } from '../../models'
import { UserDocument } from '../../models/user.model'

export async function showUserUseCase(id: string): Promise<UserDocument> {
  const user = await User.findById(id)

  if (!user) {
    throw notFoundError('user', id)
  }

  return user.view(false)
}
