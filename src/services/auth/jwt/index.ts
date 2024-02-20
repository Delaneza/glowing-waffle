import { config } from '@shared/config'
import jwt from 'jsonwebtoken'

export async function Sign(id: string, options: object = {}) {
  const modifiedOptions = { expiresIn: config.sessionTimeout, ...options }
  return jwt.sign({ id }, config.JWTSecret, modifiedOptions)
}