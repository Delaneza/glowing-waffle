import User from './user.model'

describe('user model', () => {
  it('should return the view', async () => {
    const user = await User.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'password',
    })

    expect(user.view(false)).toEqual({
      id: user.id,
      email: user.email,
      name: user.name,
      password: undefined,
    })
  })

  it('should return the full view', async () => {
    const user = await User.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'password',
    })

    expect(user.view(true)).toEqual({
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
    })
  })
})
