import { AppError, makeAppError } from '@core/errors/app-error';
import { Either, left, right } from '@core/errors/either';
import { User } from "@domain/models/user.model";
import { Document } from "mongoose";

export type CreateUserDTO = {
  email: string;
  password: string;
  name: string;
};

export type CreateUserResponse = Either<AppError, Document>

export class CreateUserUsecase {
  async execute(data: CreateUserDTO): Promise<CreateUserResponse> {
    const userAlreadyExists = await User.findOne({ email: data.email });

    if (userAlreadyExists) {
      const error = makeAppError({
        message: "User already exists",
        name: "UserAlreadyExistsError",
        status: 400
      })

      return left(error);
    }

    const user = await User.create(data);
    return right(user);
  }
}

// export async function createUser(data: CreateUserDTO): Promise<Document> {
//   const user = await User.create(data);
//   return user
// }