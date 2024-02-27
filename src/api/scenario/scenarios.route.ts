import { adaptRoute } from "@shared/http/route-adapter";
import { BodyValidator } from "@src/middlewares/body-validator.middleware";
import { EnsureAuthenticated } from "@src/middlewares/ensure-authenticated.middleware";
import { Router } from "express";
import { CreateScenarioController, ListScenariosController, ShowScenarioController } from "./controllers";
import { CreateScenarioDTO } from "./controllers/create-scenario.controller";

const scenarioRoutes: Router = Router();

scenarioRoutes.post("/", EnsureAuthenticated, BodyValidator(CreateScenarioDTO), adaptRoute(CreateScenarioController));

scenarioRoutes.get("/", EnsureAuthenticated, adaptRoute(ListScenariosController));

scenarioRoutes.get("/:id", EnsureAuthenticated, adaptRoute(ShowScenarioController));

export { scenarioRoutes };
