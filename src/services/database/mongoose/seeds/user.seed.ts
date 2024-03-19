import { User } from '@src/api/user/models'

export const userSeed = async (): Promise<void> => {
  try {
    await User.findOneAndUpdate(
      {
        email: 'admin@example.com.br',
      },
      {
        email: 'admin@example.com.br',
        password: '123456',
        name: 'Admin Example',
        role: 'admin',
      },
      {
        upsert: true,
      }
    )
    console.log('User seed created')
  } catch (error) {
    console.log('Error on user seed', error)
  }
}
