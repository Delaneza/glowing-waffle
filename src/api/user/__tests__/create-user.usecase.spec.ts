import { mongoose } from "@services/database/mongoose";
import { config } from "@shared/config";
import { CreateUserUseCase } from "../usecases";
import { User } from "../user.model";

describe('create user usecase', () => {
  beforeAll(async () => {
    mongoose.connect(config.mongodb.uri)
  })

  beforeEach(async () => {
    await User.deleteMany({})
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  it('should create a user', async () => {
    const user = await CreateUserUseCase({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'password'
    })

    expect(user).toBeDefined()
    // expect(user.id).toBeDefined()
    expect(user.name).toBe('John Doe')
    expect(user.email).toBe('john@doe.com')
    expect(user.password).toBeUndefined()
  })

  it('should throw if user already exists', async () => {
    await User.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'password'
    })

    await expect(CreateUserUseCase({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'password'
    })).rejects.toThrow('User already exists')
  })
})
