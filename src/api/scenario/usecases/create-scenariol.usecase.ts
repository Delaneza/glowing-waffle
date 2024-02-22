import { Scenario, ScenarioDocument } from "../scenario.module";

export type CreateScenarioDTO = {
  user: string;
  description: string;
  name: string;
};

export async function CreateScenarioUseCase(data: CreateScenarioDTO): Promise<ScenarioDocument> {
  const scenario = await Scenario.create(data)

  return scenario.view(false);
}