import { ok } from "@shared/http/http-responses";
import { Request, Response } from "express";
import Joi from "joi";
import { DeleteManyScenariosUseCase } from "../usecases";

export const DeleteManyScenariosDTO = Joi.object({
  ids: Joi.array().items(Joi.string().required()).required()
});

export async function DeleteManyScenariosController(req: Request, res: Response) {
  const { ids } = req.body;

  const response = await DeleteManyScenariosUseCase({ ids });

  return ok(res, response);
}