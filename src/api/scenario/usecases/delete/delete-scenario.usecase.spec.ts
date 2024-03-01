import { deleteScenarioUseCase } from '..'
import { Scenario } from '../../models'
import { ScenarioDocument } from '../../models/scenario.model'

describe('delete scenario usecase', () => {
  let defaultScenario: ScenarioDocument

  beforeEach(async () => {
    defaultScenario = await Scenario.create({
      name: 'scenario_124',
      description: 'a scenario',
      user: '65d88285ca3af2f34df058ad',
    })
  })

  it('should delete a scenario', async () => {
    const response = await deleteScenarioUseCase({
      id: defaultScenario.id,
    })

    expect(response).toEqual({ success: true, deletedCount: 1 })
  })

  it('should throw an error if scenario does not exist', async () => {
    await expect(
      deleteScenarioUseCase({
        id: '65d88285ca3af2f34df058ad',
      })
    ).rejects.toThrow('Scenario not found')
  })
})
