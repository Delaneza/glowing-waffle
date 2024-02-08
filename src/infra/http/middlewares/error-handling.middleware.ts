import { Response } from "express"

export function AppErrorHandling(err: any, _: any, res: Response) {
  console.error(err)

  if (err.errors) {
    return res.status(400).send(err.errors)
  } else {
    return res.status(500).send('Internal server error')
  }
}