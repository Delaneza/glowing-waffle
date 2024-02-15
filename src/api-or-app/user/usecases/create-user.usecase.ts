import { AppError, makeAppError } from '@shared/errors/app-error';
import { Either, left, right } from '@shared/errors/either';
import { Document } from "mongoose";
import { User } from '../user.model';

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