import { NextFunction } from 'express'

declare module 'querymen' {
  export interface QueryOptions {
    select?: string
    sort?: string
    skip?: number
    limit?: number
  }

  export interface ParsedQuery {
    select: string
    sort: string
    skip: number
    limit: number
  }

  export interface QuerymenSchema {
    [key: string]: QuerymenSchema | Object
  }

  type typeHandler = 'parsers' | 'formatters' | 'validators'

  export function handler(type: typeHandler, name: string, fn: Function): undefined | Function

  export function parser(name: string, fn: Function): undefined | Function

  export function formatter(name: string, fn: Function): undefined | Function

  export function validator(schema: QuerymenSchema | Object): undefined | Function

  export function middleware(
    schema: QuerymenSchema,
    options: QueryOptions
  ): (req: Request, res: Response, next: NextFunction) => unknown

  export function errorHandler(): (req: Request, res: Response, next: NextFunction) => unknown
}
