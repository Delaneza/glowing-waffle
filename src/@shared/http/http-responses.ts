import { Response } from 'express'

export function ok<T>(res: Response, dto?: T) {
  return res.status(200).json(dto)
}

export function noContent<T>(res: Response, result?: T) {
  return res.status(204).json(result)
}

export function created<T>(res: Response, result?: T) {
  return res.status(201).json(result)
}

export function clientError(res: Response, error: any) {
  return res.status(400).json(error)
}

export function notFound(res: Response, error: Error) {
  return res.status(404).json({ error: error.message })
}

export function conflict(res: Response, error: Error) {
  return res.status(409).json({ error: error.message })
}

export function tooMany(res: Response, error: Error) {
  return res.status(429).json({ error: error.message })
}

export function fail(res: Response, error: Error) {
  console.error(error)

  return res.status(500).json({
    error: error.message,
    stack: error.stack
  })
}