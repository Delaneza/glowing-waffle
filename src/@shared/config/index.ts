export const config = {
  env: process.env.NODE_ENV || "dev",
  host: process.env.HOST || "localhost",
  port: Number(process.env.PORT) || 9000,
  mongodb: {
    uri: process.env.MONGODB_URI,
    options: {
      debug: false
    }
  }
}