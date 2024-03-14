import { User } from '@src/api/user/models'

export const userSeed = async () => {
  await User.updateOne(
    {
      email: 'admin@example.com.br',
      password: '123456',
      name: 'Admin Example',
      role: 'admin',
    },
    {
      upsert: true,
    }
  ).catch((error) => {
    console.log('Error on user seed', error)
  })
  console.log('User seed created')
}
