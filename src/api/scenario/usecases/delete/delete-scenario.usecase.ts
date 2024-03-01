import { AppError } from '@shared/errors/app-error.error'
import { DEFAULT_ERRORS } from '../../helpers/errors'
import { Scenario } from '../../models'

type DeleteScenarioUseCaseInput = {
  id: string
}

export async function deleteScenarioUseCase(input: DeleteScenarioUseCaseInput): Promise<any> {
  const scenario = await Scenario.findById(input.id)

  if (!scenario) {
    throw new AppError(DEFAULT_ERRORS.SCENARIO_NOT_FOUND_ERROR)
  }

  const { acknowledged, deletedCount } = await scenario.deleteOne()

  return {
    success: acknowledged,
    deletedCount,
  }
}
