import { notFoundError } from '@shared/errors/default-errors.error'
import { Scenario } from '../../models'

type DeleteScenarioUseCaseInput = {
  id: string
}

export async function deleteScenarioUseCase(input: DeleteScenarioUseCaseInput): Promise<any> {
  const scenario = await Scenario.findById(input.id)

  if (!scenario) {
    throw notFoundError('scenario', input.id)
  }

  const { acknowledged, deletedCount } = await scenario.deleteOne()

  return {
    success: acknowledged,
    deletedCount,
  }
}
