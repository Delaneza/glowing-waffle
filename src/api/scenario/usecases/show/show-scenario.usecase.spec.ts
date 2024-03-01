import { showScenarioUseCase } from '..'
import { Scenario } from '../../models'
import { ScenarioDocument } from '../../models/scenario.model'

describe('show scenario usecase', () => {
  let defaultScenario: ScenarioDocument

  beforeEach(async () => {
    defaultScenario = await Scenario.create({
      name: 'scenario_124',
      description: 'a scenario',
      user: '65d88285ca3af2f34df058ad',
    })
  })

  it('should show a scenario', async () => {
    const scenario = await showScenarioUseCase({
      id: defaultScenario.id,
    })

    expect(scenario).toEqual(defaultScenario.view(false))
  })

  it('should throw an error if scenario does not exist', async () => {
    await expect(
      showScenarioUseCase({
        id: '65d88285ca3af2f34df058ad',
      })
    ).rejects.toThrow('Scenario not found')
  })
})
