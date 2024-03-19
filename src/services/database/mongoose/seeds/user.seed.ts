import { User } from '@api/user/models'

export const userSeed = async (): Promise<void> => {
  try {
    const user = await User.findOne({
      email: 'admin@example.com.br',
    })
    if (!user) {
      await User.create({
        email: 'admin@example.com.br',
        password: '123456',
        name: 'Admin Example',
        role: 'admin',
      })
      console.log('User seed created')
    }
  } catch (error) {
    console.log('Error on user seed', error)
  }
}
