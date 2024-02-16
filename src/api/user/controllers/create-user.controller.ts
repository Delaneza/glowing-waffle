import { clientError, created, fail } from "@shared/http/http-responses";
import { isString } from 'class-validator';
import { Request, Response } from "express";
import { CreateUserUsecase } from "../usecases";

const createUserUseCase = new CreateUserUsecase();

// export class CreateUserController implements Controller {
//   constructor(
//     private readonly createUserUseCase: CreateUserUsecase
//   ) { }

//   async handle(req: Request, res: Response) {
//     const { email, password, name } = req.body;

//     //body validation here

//     try {
//       const userOrError = await this.createUserUseCase.execute({ email, password, name });

//       if (userOrError.isLeft()) {

//         const { message, name, status } = userOrError.value;

//         return res.status(status).json(clientError({ message, name, status }));
//       }

//       const user = userOrError.value;

//       return created(user);
//     } catch (error) {
//       return fail(error);
//     }
//   }
// }

export type CreateUserDTO = {
  email: string;
  password: string;
  name: string;
};

export async function createUserController(req: Request, res: Response) {
  const { email, password, name } = req.body;

  //body validation here
  if (!isString(email) || !isString(password) || !isString(name)) {
    return res.status(400).json(clientError({ message: "Invalid body", name: "InvalidBodyError", status: 400 }));
  }

  try {
    const userOrError = await this.createUserUseCase.execute({ email, password, name });

    if (userOrError.isLeft()) {
      const { message, name, status } = userOrError.value;

      return res.status(status).json(clientError({ message, name, status }));
    }

    const user = userOrError.value;

    return res.status(created(user).statusCode).json(created(user));
  } catch (error) {
    return fail(error);
  }
}