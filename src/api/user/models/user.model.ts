import { Schema, model } from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

export const roles: string[] = ['user', 'planner', 'application']

export type UserDocument = {
  id: string
  email: string
  password: string
  name: string
  role: string[]
  active: boolean
  view(full: boolean): any
}

export const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: [String], enum: roles, default: ['user'] },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

 

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

  authenticate(password) {
    return bcrypt.compare(password, this.password).then((valid) => (valid ? this : false))
  },
}

const User = model<UserDocument>('User', userSchema)

export default User

