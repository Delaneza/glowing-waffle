export type AppError = {
  message: string;
  name: string;
  status: number;
}

export function makeAppError({ message, name, status }: AppError): AppError {
  return {
    message,
    name,
    status
  }
}