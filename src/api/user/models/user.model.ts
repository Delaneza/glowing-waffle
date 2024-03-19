import { config } from '@shared/config'
import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
const env = config.env

export const roles: string[] = ['user', 'admin', 'planner', 'application']

export type UserDocument = {
  id: string
  email: string
  password: string
  name: string
  role: string
  active: boolean
  view(full: boolean): any
  authenticate(password: string): Promise<UserDocument | false>
}

export const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: roles, default: 'user' },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  try {
    const rounds = env === 'test' ? 1 : 10
    const hash = await bcrypt.hash(this.password, rounds)
    this.password = hash
    next()
  } catch (err) {
    next(err)
  }
})

userSchema.methods = {
  view(full: boolean) {
    const view = {
      // simple view
      id: this.id,
      email: this.email,
      name: this.name,
      role: this.role,
      active: this.active,
    }
    return full
      ? {
          ...view,
          password: this.password,
        }
      : view
  },
  async authenticate(password: string): Promise<UserDocument | false> {
    const valid = await bcrypt.compare(password, this.password)
    return valid ? this : false
  },
}

const User = model<UserDocument>('User', userSchema)

export default User
