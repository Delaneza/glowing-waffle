import { ok } from "@shared/http/http-responses";
import { Request, Response } from "express";
import { ListScenariosUseCase } from "../usecases";

export async function ListScenariosController(req: Request, res: Response) {
  const { name, description, cursor } = req.query;

  const scenarios = await ListScenariosUseCase({
    name: name as string,
    description: description as string,
    cursor: cursor ? JSON.parse(cursor as string) : {}
  });

  return ok(res, scenarios);
}