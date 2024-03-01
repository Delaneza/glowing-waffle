import { Scenario, ScenarioDocument } from '../../models'

export type CreateScenarioInput = {
  user: string
  description: string
  name: string
}

export async function CreateScenarioUseCase(data: CreateScenarioInput): Promise<ScenarioDocument> {
  const scenario = await Scenario.create(data)

  return scenario.view(false)
}
