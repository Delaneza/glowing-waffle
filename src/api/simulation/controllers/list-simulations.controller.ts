import { ok } from "@shared/http/http-responses";
import { Request, Response } from "express";
import { ListSimulationsUseCase } from "../usecases";

export async function ListSimulationsController(req: Request, res: Response) {
  const { name, status, scenario, reference_month, simulation_cd_id, user, cursor } = req.query;

  const simulations = await ListSimulationsUseCase({
    name: name as string,
    status: status as string,
    scenario: scenario as string,
    reference_month: new Date(reference_month as string),
    simulation_cd_id: simulation_cd_id as string,
    user: user as string,
    cursor: cursor ? JSON.parse(cursor as string) : {}
  });

  return ok(res, simulations);
}