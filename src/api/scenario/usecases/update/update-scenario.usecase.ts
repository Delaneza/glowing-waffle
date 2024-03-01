import { AppError } from '@shared/errors/app-error.error'
import { DEFAULT_ERRORS } from '../../helpers/errors'
import { Scenario, ScenarioDocument } from '../../models'

export type UpdateScenarioUseCaseInput = {
  id: string
  name?: string
  description?: string
}

export async function UpdateScenarioUseCase(input: UpdateScenarioUseCaseInput): Promise<ScenarioDocument> {
  const scenario = await Scenario.findById(input.id)

  if (!scenario) {
    throw new AppError(DEFAULT_ERRORS.SCENARIO_NOT_FOUND_ERROR)
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
