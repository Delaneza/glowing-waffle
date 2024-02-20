import { Sign } from "@services/auth/jwt";
import { AppError } from "@shared/errors/app-error.error";
import { User } from "@src/api/user/user.model";

type NewSessionDTO = {
  email: string;
  password: string;
};

const INVALID_CREDENTIALS_ERROR = {
  message: "Invalid email or password",
  name: "InvalidCredentialsError",
  statusCode: 401,
};

export async function NewSessionUseCase(data: NewSessionDTO) {
  const user = await User.findOne({
    email: data.email,
    password: data.password,
  });

  if (!user) {
    throw new AppError(INVALID_CREDENTIALS_ERROR);
  }

  if (user.password !== data.password) {
    throw new AppError(INVALID_CREDENTIALS_ERROR);
  }

  const token = await Sign(user.id);

  return { token, user: user.view(false) };
}