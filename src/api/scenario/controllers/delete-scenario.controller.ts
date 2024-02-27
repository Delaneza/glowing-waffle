import { ok } from "@shared/http/http-responses";
import { Request, Response } from "express";
import { DeleteScenarioUseCase } from "../usecases";

export async function DeleteScenarioController(req: Request, res: Response) {
  const { id } = req.params;

  const response = await DeleteScenarioUseCase({ id });

  return ok(res, response);
}