declare namespace Express {
  export interface Request {
    user: UserDocument | string
  }
}
