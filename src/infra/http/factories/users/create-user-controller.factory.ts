import { CreateUserUsecase } from "src/@core/app/usecases/users/create.usecase";
import { Controller } from "../../controllers/controller.interface";
import { CreateUserController } from "../../controllers/users/create-user.controller";

export function makeCreateUserController(): Controller {
  const createUserUseCase = new CreateUserUsecase();
  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
}