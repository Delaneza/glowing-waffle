import { clientError, created } from "@shared/http/http-responses";
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

export async function createUserController(req: Request, res: Response) {
  const { email, password, name } = req.body;

  //body validation here

  try {
    const userOrError = await this.createUserUseCase.execute({ email, password, name });

    if (userOrError.isLeft()) {

      const { message, name, status } = userOrError.value;

      return res.status(status).json(clientError({ message, name, status }));
    }

    const user = userOrError.value;

    return created(user);
  } catch (error) {
    return fail(error);
  }
}