import dotenv from 'dotenv'

dotenv.config()

const requireProcessEnv = (name: string) => {
  if (!process.env[name] && process.env.NODE_ENV !== 'test') {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name] ?? 'test'
}

const SEVEN_DAYS = 60 * 60 * 24 * 7

export const config = {
  env: process.env.NODE_ENV ?? 'dev',
  host: process.env.HOST ?? '0.0.0.0',
  port: process.env.PORT ?? 9000,
  mongodb: {
    uri: process.env.MONGODB_URI ?? 'mongodb://mongodb:27017/db',
    options: {
      debug: false,
    },
  },
  postgres: {},
  sessionTimeout: SEVEN_DAYS,
  JWTSecret: requireProcessEnv('JWT_SECRET'),
  bucket: requireProcessEnv('BUCKET'),
  region: requireProcessEnv('REGION'),
  accessKeyId: requireProcessEnv('ACCESS_KEY_ID'),
  secretAccessKey: requireProcessEnv('SECRET_ACCESS_KEY'),
  masterKey: requireProcessEnv('MASTER_KEY'),
  jwtSecret: requireProcessEnv('JWT_SECRET'),
}
