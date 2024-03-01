import { notFoundError } from '@shared/errors/default-errors.error'
import { Scenario } from '../../models'
import { ScenarioDocument } from '../../models/scenario.model'

export type ShowScenarioInput = {
  id: string
}

export async function showScenarioUseCase(input: ShowScenarioInput): Promise<ScenarioDocument> {
  const scenario = await Scenario.findById(input.id)

  if (!scenario) {
    throw notFoundError('scenario', input.id)
  }

  return scenario.view(true)
}
