import { Scenario, ScenarioDocument } from '../scenario.module'
import { DeleteManyScenariosUseCase } from '../usecases'

describe('delete many scenarios usecase', () => {
  let defaultScenarios: ScenarioDocument[]

  beforeEach(async () => {
    defaultScenarios = await Scenario.create([
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

  it('should delete many scenarios', async () => {
    const response = await DeleteManyScenariosUseCase({
      ids: defaultScenarios.map((scenario) => scenario.id),
    })

    expect(response).toEqual({ success: true, deletedCount: 3, undeletedIds: [] })
  })

  it('should not delete scenarios that do not exist', async () => {
    const response = await DeleteManyScenariosUseCase({
      ids: ['65d88285ca3af2f34df058ad'],
    })

    expect(response).toEqual({ success: true, deletedCount: 0, undeletedIds: ['65d88285ca3af2f34df058ad'] })
  })

  it('should not delete scenarios that do not exist', async () => {
    const response = await DeleteManyScenariosUseCase({
      ids: ['65d88285ca3af2f34df058ad', defaultScenarios[0].id],
    })

    expect(response).toEqual({ success: true, deletedCount: 1, undeletedIds: ['65d88285ca3af2f34df058ad'] })
  })
})
