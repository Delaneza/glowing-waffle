import passport from 'passport'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { z } from 'zod'
import { User } from '../../../api/user/models'
import { config } from '../../../shared/config/index'

const masterKey = config.masterKey
const jwtSecret = config.jwtSecret
const sessionTimeout = config.sessionTimeout

interface IUser {
  email: string
  password: string
  role: 'admin' | 'user'
  active: boolean
}

interface ITokenOptions {
  required: boolean
  role: string[]
}

const UserSchema = z.object({
  email: z.string(),
  password: z.string(),
  role: z.enum(['user', 'planner', 'application']),
})

const AuthErrorSchema = z.object({
  message: z.string(),
})



export const initializePassportStrategies = () => {
  passport.use(
    'password',
    new BasicStrategy(async (email: string, password: string, done) => {
      const user = await User.findOne({ email: email })

      if (!user) {
        done(null, false)
        return null
      }
      const result = await user.authenticate(password)

      if (result) {
        done(null, user)
      } else {
        done(null, false)
      }
      return null
    })
  )

  passport.use(
    'master',
    new BearerStrategy((token, done) => {
      if (token === masterKey) {
        done(null, {})
      } else {
        done(null, false)
      }
    })
  )

  passport.use(
    'token',
    new JwtStrategy(
      {
        secretOrKey: jwtSecret,
        jwtFromRequest: ExtractJwt.fromExtractors([
          ExtractJwt.fromUrlQueryParameter('access_token'),
          ExtractJwt.fromBodyField('access_token'),
          ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        ]),
      },
      async ({ id, iat }, done: Function) => {
        const user = await User.findById(id)

        if (iat + sessionTimeout < Math.floor(new Date().getTime() / 1000)) {
          done(440, false)
        } else {
          done(null, user)
        }
        return null
      }
    )
  )
}
