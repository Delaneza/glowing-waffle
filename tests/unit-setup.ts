import { afterAll, afterEach, beforeAll } from '@jest/globals';
import { mongoose } from '@services/database/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongodbMemoryServer: MongoMemoryServer

beforeAll(async () => {
  mongodbMemoryServer = await MongoMemoryServer.create();
  const uri = mongodbMemoryServer.getUri();
  mongoose.connect(uri)
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongodbMemoryServer.stop()
})

afterEach(async () => {
  const { collections } = mongoose.connection
  const promises = []
  Object.keys(collections).forEach((collection) => {
    promises.push(collections[collection].deleteMany())
  })
  await Promise.all(promises)
})
