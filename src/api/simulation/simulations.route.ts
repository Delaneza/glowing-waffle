import { adaptRoute } from "@shared/http/route-adapter";
import { BodyValidator } from "@src/middlewares/body-validator.middleware";
import { EnsureAuthenticated } from "@src/middlewares/ensure-authenticated.middleware";
import { Router } from "express";
import { CreateSimulationController } from "./controllers";
import { CreateSimulationDTO } from "./controllers/create-simulation.controller";
import { ListSimulationsController } from "./controllers/list-simulations.controller";

const simulationRoutes: Router = Router();

simulationRoutes.post(
  '/',
  EnsureAuthenticated,
  BodyValidator(CreateSimulationDTO),
  adaptRoute(CreateSimulationController)
);

simulationRoutes.get(
  '/',
  EnsureAuthenticated,
  adaptRoute(ListSimulationsController)
);

export { simulationRoutes };
