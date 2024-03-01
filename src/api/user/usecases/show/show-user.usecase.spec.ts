import mongoose from 'mongoose'
import { showUserUseCase } from '..'
import { User } from '../../models'
import { UserDocument } from '../../models/user.model'

describe('show user usecase', () => {
  let userToShow: UserDocument

  beforeEach(async () => {
    userToShow = await User.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'password',
    })
  })

  it('should show a user', async () => {
    const user = await showUserUseCase(userToShow.id)

    expect(user).toBeDefined()
    expect(user.id).toBe(userToShow.id)
    expect(user.name).toBe('John Doe')
    expect(user.email).toBe('john@doe.com')
    expect(user.password).toBeUndefined()
  })

  it('should throw if user does not exist', async () => {
    const invalidId = new mongoose.Types.ObjectId().toHexString()
    await expect(showUserUseCase(invalidId)).rejects.toThrow(`User not found with id: \'${invalidId}\'`)
  })
})
