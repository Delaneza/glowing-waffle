import { CreateScenarioUseCase } from '..'

describe('create scenario usecase', () => {
  const payload = {
    name: 'scenario_124',
    description: 'a scenario 124',
    user: '65d88285ca3af2f34df058ad',
  }

  it('should create scenario', async () => {
    const scenario = await CreateScenarioUseCase(payload)

    expect(scenario).toEqual({
      id: expect.any(String),
      name: 'scenario_124',
      description: 'a scenario 124',
      user: '65d88285ca3af2f34df058ad',
      lastSimulation: undefined,
      simulated: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })
})
