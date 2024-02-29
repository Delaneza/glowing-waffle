import { afterAll, afterEach, beforeAll } from '@jest/globals'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { mongoose } from '../src/services/database/mongoose'

let mongodbMemoryServer: MongoMemoryServer

beforeAll(async () => {
  mongodbMemoryServer = await MongoMemoryServer.create()
  const uri = mongodbMemoryServer.getUri()
  mongoose.connect(uri)
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongodbMemoryServer.stop()
})

afterEach(async () => {
  const { collections } = mongoose.connection
  const promises: Array<Promise<mongoose.mongo.DeleteResult>> = [] // Explicitly define the type of the promises array
  Object.keys(collections).forEach((collection) => promises.push(collections[collection].deleteMany()))
  await Promise.all(promises)
})
