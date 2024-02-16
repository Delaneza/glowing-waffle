import { clientError, created } from "@shared/http/http-responses";
import { DtoSchemaValidator } from "@shared/validators/dto-schema-validator";
import { NextFunction, Request, Response } from "express";
import Joi from 'joi';
import { CreateUserUseCase } from "../usecases";

const CreateUserDTO = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required()
})

export async function CreateUserController(req: Request, res: Response, next: NextFunction) {
  const { email, password, name } = req.body;

  const errors = await DtoSchemaValidator({ schema: CreateUserDTO, data: req.body });

  if (errors) {
    return clientError(res, errors)
  }

  try {
    const user = await CreateUserUseCase({ email, password, name });

    return created(res, user)
  } catch (error) {
    return next(error);
  }
}