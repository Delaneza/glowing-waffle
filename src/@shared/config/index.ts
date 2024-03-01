import 'dotenv/config'

const SEVEN_DAYS = 60 * 60 * 24 * 7

export const config = {
  env: process.env.NODE_ENV ?? 'dev',
  host: (process.env.HOST as string) ?? ('0.0.0.0' as string),
  port: (Number(process.env.PORT) as number) ?? (9000 as number),
  mongodb: {
    uri: process.env.MONGODB_URI ?? '',
    options: {
      debug: false,
    },
  },
  postgres: {},
  sessionTimeout: SEVEN_DAYS,
  JWTSecret: process.env.JWT_SECRET ?? '',
  simulationsS3Bucket: {
    bucket: process.env.SIMULATIONS_S3_BUCKET ?? '',
    region: process.env.SIMULATIONS_S3_REGION ?? '',
    accessKeyId: process.env.SIMULATIONS_S3_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.SIMULATIONS_S3_SECRET_ACCESS_KEY ?? '',
  },
}
