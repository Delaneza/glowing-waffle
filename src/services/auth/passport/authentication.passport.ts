import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import passport_azure_ad from 'passport-azure-ad'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { z } from 'zod'
import { User, roles } from '../../../api/user/models'
import { config } from '../../../shared/config/index'
import * as imported_config from './config'
import { AuthenticationError, AuthorizationError, ExpiredTokenError, ValidationError } from './error'
const masterKey = config.masterKey
const jwtSecret = config.jwtSecret
const sessionTimeout = config.sessionTimeout
const OIDCBearerStrategy = passport_azure_ad.BearerStrategy

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

class Authentication {
  constructor() {
    this.initializePassportStrategiesPassword()
    this.initializePassportStrategiesMaster()
    this.initializePassportStrategiesToken()
    this.intializePassportStrategiesAzure()
  }
  public password(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('password', { session: false }, (err: Error, user: IUser, info: string) => {
      try {
        if (err) {
          const authError = AuthErrorSchema.safeParse({ message: err.message })

          if (!authError.success) throw new ValidationError()
        }

        if (!user?.email || !user?.password || !user?.role || !user?.active) {
          throw new AuthenticationError()
        }

        if (user.role !== req.body.role) {
          throw new AuthorizationError()
        }

        return req.logIn(user, { session: false }, (err: Error) => {
          if (err) return res.status(401).end()
          return next()
        })
      } catch (error) {
        next(error)
      }
    })(req, res, next)
  }

  public azureAD(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('azureAD', { session: false })
  }

  public master(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('master', { session: false })
  }

  public token({ required, role = roles }: ITokenOptions) {
    return (req: Request, res: Response, next: NextFunction) => {
      passport.authenticate('token', { session: false }, (err: Error, user: IUser, info: string) => {
        try {
          if (err || (required && !user) || (required && !roles.includes(user.role)) || !user.active) {
            const authError = AuthErrorSchema.safeParse({ message: err.message })

            if (!authError.success) throw new ExpiredTokenError()
          }

          return req.logIn(user, { session: false }, (err: Error) => {
            if (err) return res.status(401).end()
            return next()
          })
        } catch (error) {
          next(error)
        }
      })(req, res, next)
    }
  }

  private async initializePassportStrategiesPassword() {
    try {
      console.log('Initializing password strategy')
      passport.use(
        'password',
        new BasicStrategy(async (email: String, password: String, done) => {
          const user = await User.findOne({ email: email })
          if (!user) {
            done(null, false)
            return null
          }
          const result = await user.authenticate(password)
          // .authenticate(password, user.password)

          if (result) {
            done(null, user)
          } else {
            done(null, false)
          }
        })
      )
    } catch (error) {
      console.log('Error in initializePassportStrategies: ', error)
    }
  }

  private async initializePassportStrategiesMaster() {
    try {
      console.log('Initializing master strategy')
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
    } catch (error) {
      console.log('Error in initializePassportStrategies: ', error)
    }
  }

  private async initializePassportStrategiesToken() {
    try {
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
          async ({ id, iat }, done: Error | User) => {
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
    } catch (error) {
      console.log('Error in initializePassportStrategies: ', error)
    }
  }

  intializePassportStrategiesAzure() {
    try {
      const options = {
        identityMetadata: imported_config.creds.identityMetadata,
        clientID: imported_config.creds.clientID,
        validateIssuer: imported_config.creds.validateIssuer,
        issuer: imported_config.creds.issuer,
        passReqToCallback: imported_config.creds.passReqToCallback,
        // isB2C: imported_config.creds.isB2C,
        // policyName: imported_config.creds.policyName,
        // allowMultiAudiencesInToken: imported_config.creds.allowMultiAudiencesInToken,
        // audience: imported_config.creds.audience,
        loggingLevel: imported_config.creds.loggingLevel,
        // loggingNoPII: imported_config.creds.loggingNoPII,
        clockSkew: imported_config.creds.clockSkew,
      }

      passport.use(
        'azureAD',
        new OIDCBearerStrategy(options, async function (user: User, done: Error | User) {
          const createdUser = await User.createFromService({
            service: 'azureAD',
            id: user.oid,
            name: user.name,
            email: user.email,
          })

          done(null, createdUser)
          return null
        })
      )
    } catch (error) {
      console.log('Error in initializePassportStrategies: ', error)
    }
  }
}

export default Authentication
