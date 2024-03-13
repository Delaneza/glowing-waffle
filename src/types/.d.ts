// types.d.ts
declare module 'express-serve-static-core' {
  export interface Request {
    logIn(user: any, options: any, callback: (err: Error) => void): void
  }
}
