import { Scenario, ScenarioDocument } from '../scenario.module'
import { UpdateScenarioUseCase, UpdateScenarioUseCaseInput } from '../usecases/update-scenario.usecase'

describe('update scenario usecase', () => {
  let defaultScenario: ScenarioDocument
  let payload: UpdateScenarioUseCaseInput

  beforeEach(async () => {
    defaultScenario = await Scenario.create({
      name: 'scenario_124',
      description: 'a scenario',
      user: '65d88285ca3af2f34df058ad',
    })

    payload = {
      id: defaultScenario.id,
      name: 'scenario_125',
      description: 'a scenario 125',
    }
  })

  it('should update a scenario', async () => {
    const scenario = await UpdateScenarioUseCase(payload)

    expect(scenario).toEqual({
      id: defaultScenario.id,
      name: 'scenario_125',
      description: 'a scenario 125',
      user: '65d88285ca3af2f34df058ad',
      lastSimulation: undefined,
      simulated: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should throw an error if scenario does not exist', async () => {
    await expect(
      UpdateScenarioUseCase({
        id: '65d88285ca3af2f34df058ad',
      })
    ).rejects.toThrow('Scenario not found')
  })
})
