import { Scenario } from '../../models'
import { ScenarioDocument } from '../../models/scenario.model'

export type CreateScenarioInput = {
  user: string
  description: string
  name: string
}

export async function createScenarioUseCase(data: CreateScenarioInput): Promise<ScenarioDocument> {
  const scenario = await Scenario.create(data)

  return scenario.view(false)
}
