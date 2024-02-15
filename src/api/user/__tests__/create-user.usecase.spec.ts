import { CreateUserUsecase } from "../usecases";

describe('create user usecase', () => {
  let usecase: CreateUserUsecase

  beforeEach(() => {
    usecase = new CreateUserUsecase()
  })

  it('should create a user', async () => {
    const userOrError = await usecase.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'password'
    })

    expect(userOrError.isRight()).toBe(true)

    const user = userOrError.value as any

    expect(user).toBeDefined()
    expect(user.id).toBeDefined()
    expect(user.name).toBe('John Doe')
    expect(user.email).toBe('john@doe.com')
    expect(user.password).toBeUndefined()
  })
})
