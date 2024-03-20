declare namespace Express {
  interface ISelect {
    [key: string]: string
  }

  interface ICursor {
    skip: number
    limit: number
    sort: {
      [key: string]: number
    }
  }

  interface IQuery {
    [key: string]: boolean | string | Date | RegExp | { $in: Array<T> }
  }

  interface IParams {
    [key: string]: string
  }

  interface Querymen {
    query: IQuery
    cursor: ICursor
    select: ISelect
  }

  export interface Request {
    logIn(user: any, options: any, callback: (err: Error) => void): void
    user: UserDocument | string
    querymen: Querymen
    params: IParams
  }
}
