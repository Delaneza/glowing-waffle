import mongoose from "mongoose"
import { ShowUserUseCase } from "../usecases"
import { User, UserDocument } from "../user.model"

describe('show user usecase', () => {
  let userToShow: UserDocument

  beforeEach(async () => {
    userToShow = await User.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'password'
    })
  })

  it('should show a user', async () => {
    const user = await ShowUserUseCase(userToShow.id)

    expect(user).toBeDefined()
    expect(user.id).toBe(userToShow.id)
    expect(user.name).toBe('John Doe')
    expect(user.email).toBe('john@doe.com')
    expect(user.password).toBeUndefined()
  })

  it('should throw if user does not exist', async () => {
    const invalidId = new mongoose.Types.ObjectId().toHexString()
    await expect(ShowUserUseCase(invalidId)).rejects.toThrow(`User not found with id: \'${invalidId}\'`)
  })
})
