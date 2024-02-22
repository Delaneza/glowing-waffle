import { created } from "@shared/http/http-responses";
import { Request, Response } from "express";
import Joi from "joi";
import { CreateScenarioUseCase } from "../usecases";

export const CreateScenarioDTO = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required()
})

export async function CreateScenarioController(req: Request, res: Response) {
  const { name, description } = req.body;
  const { userId: user } = req;

  const scenario = await CreateScenarioUseCase({ user, name, description });

  return created(res, scenario)
}