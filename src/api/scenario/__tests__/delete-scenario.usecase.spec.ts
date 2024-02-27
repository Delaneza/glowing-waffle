import { Scenario, ScenarioDocument } from "../scenario.module"
import { DeleteScenarioUseCase } from "../usecases"

describe('delete scenario usecase', () => {
  let defaultScenario: ScenarioDocument

  beforeEach(async () => {
    defaultScenario = await Scenario.create(
      {
        name: "scenario_124",
        description: "a scenario",
        user: '65d88285ca3af2f34df058ad'
      })
  })

  it('should delete a scenario', async () => {
    const response = await DeleteScenarioUseCase({
      id: defaultScenario.id
    })

    expect(response).toEqual({ success: true, deletedCount: 1 })
  })

  it('should throw an error if scenario does not exist', async () => {
    await expect(DeleteScenarioUseCase({
      id: '65d88285ca3af2f34df058ad'
    })).rejects.toThrow('Scenario not found')
  })
})
