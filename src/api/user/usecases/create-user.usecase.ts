import { UserAlreadyExistsError } from '@shared/errors/user-already-exists.error';
import { User, UserDocument } from '../user.model';

export type CreateUserDTO = {
  email: string;
  password: string;
  name: string;
};

export async function CreateUserUseCase(data: CreateUserDTO): Promise<UserDocument> {
  const userAlreadyExists = await User.findOne({ email: data.email });

  if (userAlreadyExists) {
    throw new UserAlreadyExistsError(data.email);
  }

  const user = await User.create(data)

  return user.view(false);
}