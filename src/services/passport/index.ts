import passport from 'passport'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { z } from 'zod'
import { User } from '../../api/user/models'
import { config } from '../../shared/config/index'

const masterKey = config.masterKey
const jwtSecret = config.jwtSecret
const sessionTimeout = config.sessionTimeout

export const initializePassportStrategies = () => {
  passport.use(
    'password',
    new BasicStrategy(async (email: string, password: string, done) => {
      const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })

      const result = schema.safeParse({ email, password })
      if (!result.success) {
        done(result.error)
        return null
      }

      const user = await User.findOne({ email: email })

      if (!user) {
        done(null, false)
        return null
      }

      const authenticate = await user.authenticate(password)

      if (authenticate) {
        done(null, user)
      } else {
        done(null, false)
      }
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
