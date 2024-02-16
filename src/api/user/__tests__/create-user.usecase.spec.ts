import { mongoose } from "@services/database/mongoose";
import { config } from "@shared/config";
import { isAppError } from "@shared/errors/app-error";
import { CreateUserUsecase } from "../usecases";
import { User } from "../user.model";

describe('create user usecase', () => {
  let usecase: CreateUserUsecase

  beforeAll(async () => {
    mongoose.connect(config.mongodb.uri)
  })

  beforeEach(async () => {
    await User.deleteMany({})
    usecase = new CreateUserUsecase()
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  it('should create a user', async () => {
    const userOrError = await usecase.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'password'
    })

    expect(!isAppError(userOrError)).toBe(true)

    const user = userOrError as any

    expect(user).toBeDefined()
    expect(user.id).toBeDefined()
    expect(user.name).toBe('John Doe')
    expect(user.email).toBe('john@doe.com')
    expect(user.password).toBe('password')
  })

  it('should throw if user already exists', async () => {
    await User.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'password'
    })

    const userOrError = await usecase.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'password'
    })

    expect(isAppError(userOrError)).toBe(true)

    const error = userOrError as any

    expect(error).toBeDefined()
    expect(error.status).toBe(409)
    expect(error.message).toBe('User already exists with email john@doe.com')
    expect(error.name).toBe('UserAlreadyExistsError')
  })
})
