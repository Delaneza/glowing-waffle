import { AppError } from "@shared/errors/app-error.error";
import { Scenario, ScenarioDocument } from "../scenario.module";

const DEFAULT_ERRORS = {
  SCENARIO_NOT_FOUND_ERROR: {
    message: 'Scenario not found',
    name: 'ScenarioNotFoundError',
    statusCode: 404,
  }
}

export type ShowScenarioInput = {
  id: string;
}

export async function ShowScenarioUseCase(input: ShowScenarioInput): Promise<ScenarioDocument> {

  const scenario = await Scenario.findById(input.id);

  if (!scenario) {
    throw new AppError(DEFAULT_ERRORS.SCENARIO_NOT_FOUND_ERROR)
  }

  return scenario.view(true);
}