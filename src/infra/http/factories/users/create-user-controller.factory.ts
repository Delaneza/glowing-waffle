import { CreateUserController } from "@app/user/controllers";
import { CreateUserUsecase } from "@app/user/usecases";
import { Controller } from "@shared/interfaces/controller.interface";


export function makeCreateUserController(): Controller {
  const createUserUseCase = new CreateUserUsecase();
  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
}