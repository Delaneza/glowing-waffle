import { userSeed } from './user.seed'

export const seedDatabase = async () => {
  await Promise.all([userSeed()])
}
