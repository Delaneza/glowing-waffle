import { clientError, created } from "@shared/http/http-responses";
import { Controller } from "@shared/interfaces/controller.interface";
import { Request, Response } from "express";
import { CreateUserUsecase } from "../usecases";


export class CreateUserController implements Controller {
  constructor(
    private readonly createUserUseCase: CreateUserUsecase
  ) { }

  async handle(req: Request, res: Response) {
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
}