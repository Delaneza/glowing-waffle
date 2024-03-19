import { config } from '@shared/config'
import mongoose from 'mongoose'

const mongodbConfig = config.mongodb

Object.keys(mongodbConfig.options).forEach((key: any) => {
  mongoose.set(key, mongodbConfig.options[key])
})

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err)
  process.exit(-1)
})

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB')
})

export { mongoose }
