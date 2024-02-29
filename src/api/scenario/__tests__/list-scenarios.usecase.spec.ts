import { Scenario } from '../scenario.model'
import { ListScenariosUseCase } from '../usecases'

describe('list scenarios usecase', () => {
  beforeEach(async () => {
    await Scenario.create([
      {
        name: 'scenario_124',
        description: 'a scenario',
        user: '65d88285ca3af2f34df058ad',
      },
      {
        name: 'scenario_1245',
        description: 'a scenario 1245',
        user: '65d88285ca3af2f34df058ad',
        simulated: true,
        lastSimulation: '65d88285ca3af2f34df058ba',
      },
      {
        name: 'scenario_56',
        description: 'this is the 56 scenario',
        user: '65d88285ca3af2f34df053ad',
      },
    ])
  })

  it('should list scenarios', async () => {
    const scenarios = await ListScenariosUseCase({
      cursor: {},
    })

    expect(scenarios).toHaveLength(3)
  })

  it('should list scenarios by name', async () => {
    const scenarios = await ListScenariosUseCase({
      name: 'scenario_124',
      cursor: {},
    })

    expect(scenarios).toHaveLength(2)
  })

  it('should list scenarios by description', async () => {
    const scenarios = await ListScenariosUseCase({
      description: 'this is the 56 scenario',
      cursor: {},
    })

    expect(scenarios).toHaveLength(1)
  })

  it('should list scenarios by name and description', async () => {
    const scenarios = await ListScenariosUseCase({
      name: 'scenario_124',
      description: 'a scenario',
      cursor: {},
    })

    expect(scenarios).toHaveLength(2)
  })

  it('should list scenarios by page', async () => {
    const scenarios = await ListScenariosUseCase({
      cursor: {
        page: 1,
        limit: 1,
      },
    })

    expect(scenarios).toHaveLength(1)
  })

  it('should list scenarios by sort', async () => {
    const scenarios = await ListScenariosUseCase({
      cursor: {
        sort: 'name',
        order: 'asc',
      },
    })

    expect(scenarios[0].name).toBe('scenario_124')
  })
})
