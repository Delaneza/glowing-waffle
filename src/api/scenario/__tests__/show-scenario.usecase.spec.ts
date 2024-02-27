import { Scenario, ScenarioDocument } from "../scenario.module"
import { ShowScenarioUseCase } from "../usecases"

describe('show scenario usecase', () => {
  let defaultScenario: ScenarioDocument

  beforeEach(async () => {
    defaultScenario = await Scenario.create(
      {
        name: "scenario_124",
        description: "a scenario",
        user: '65d88285ca3af2f34df058ad'
      })
  })

  it('should show a scenario', async () => {
    const scenario = await ShowScenarioUseCase({
      id: defaultScenario.id
    })

    expect(scenario).toEqual(defaultScenario.view(false))
  })

  it('should throw an error if scenario does not exist', async () => {
    await expect(ShowScenarioUseCase({
      id: '65d88285ca3af2f34df058ad'
    })).rejects.toThrow('Scenario not found')
  })
})
