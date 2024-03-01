import { notFoundError } from '@shared/errors/default-errors.error'
import { Scenario } from '../../models'
import { ScenarioDocument } from '../../models/scenario.model'

export type UpdateScenarioUseCaseInput = {
  id: string
  name?: string
  description?: string
}

export async function updateScenarioUseCase(input: UpdateScenarioUseCaseInput): Promise<ScenarioDocument> {
  const scenario = await Scenario.findById(input.id)

  if (!scenario) {
    throw notFoundError('scenario', input.id)
  }

  const possibleFieldsToUpdate = ['name', 'description']

  possibleFieldsToUpdate.forEach((field) => {
    if (input[field]) {
      scenario[field] = input[field]
    }
  })

  await scenario.save()

  return scenario.view(true)
}
