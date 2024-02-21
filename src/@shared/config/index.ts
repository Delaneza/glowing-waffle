import 'dotenv/config';

const SEVEN_DAYS = 60 * 60 * 24 * 7;

export const config = {
  env: process.env.NODE_ENV || "dev",
  host: process.env.HOST || "localhost",
  port: Number(process.env.PORT) || 9000,
  mongodb: {
    uri: process.env.MONGODB_URI,
    options: {
      debug: false
    }
  },
  postgres: {},
  sessionTimeout: 60,
  JWTSecret: process.env.JWT_SECRET
}