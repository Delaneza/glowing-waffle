// types.d.ts
// declare module 'express-serve-static-core' {
//   export interface Request {
//     logIn(user: any, options: any, callback: (err: Error) => void): void
//   }
// }

// types.d.ts

declare module 'express-serve-static-core' {
  interface ISelect {
    select: string
  }
  interface ICursor {
    cursor?: string
  }
  interface IQuery {
    name?: string
  }

  interface IParams {
    id: string
  }

  interface Querymen {
    query: IQuery
    cursor: ICursor
    select: ISelect

  }

  export interface Request {
    logIn(user: any, options: any, callback: (err: Error) => void): void
    querymen: Querymen
    params: IParams
  }
}
