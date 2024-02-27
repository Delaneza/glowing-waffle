type AppErrorInput = {
  message: string
  statusCode: number
  name: string
}

export class AppError extends Error {
  statusCode: number

  constructor({ message, name, statusCode }: AppErrorInput) {
    super(message)
    this.name = name
    this.statusCode = statusCode
  }
}
