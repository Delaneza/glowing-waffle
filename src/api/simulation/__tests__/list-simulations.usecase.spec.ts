import { Simulation } from '../simulation.module'
import { ListSimulationsUseCase } from '../usecases'

describe('list simulations usecase', () => {
  beforeEach(async () => {
    await Simulation.create([
      {
        status: 'success',
        scenario: '65d88285ca3af2f34df058ad',
        reference_month: new Date(),
        simulation_cd_id: '65d88285ca3af2f34df058ba',
        user: '65d88285ca3af2f34df058ad',
      },
      {
        status: 'success',
        scenario: '65d88285ca3af2f34df058ad',
        reference_month: new Date(),
        simulation_cd_id: '65d88285ca3af2f34df058bd',
        user: '65d88285ca3af2f34df058ad',
      },
      {
        status: 'error',
        scenario: '65d88285ca3af2f34df058ad',
        reference_month: new Date(),
        simulation_cd_id: '65d88285ca3af2f34df058',
        user: '65d88285ca3af2f34df058ad',
      },
      {
        status: 'success',
        scenario: '65d88285ca3af2f34df058bd',
        reference_month: new Date(),
        simulation_cd_id: '65d88285ca3af2f34df059',
        user: '65d88285ca3af2f34df055ad',
      },
    ])
  })

  it('should list simulations', async () => {
    const simulations = await ListSimulationsUseCase({ cursor: {} })

    expect(simulations).toHaveLength(4)
  })

  it('should list simulations by status', async () => {
    const simulations = await ListSimulationsUseCase({ status: 'success', cursor: {} })

    expect(simulations).toHaveLength(3)
  })

  it('should list simulations by scenario', async () => {
    const simulations = await ListSimulationsUseCase({ scenario: '65d88285ca3af2f34df058ad', cursor: {} })

    expect(simulations).toHaveLength(3)
  })

  it('should list simulations by user', async () => {
    const simulations = await ListSimulationsUseCase({ user: '65d88285ca3af2f34df058ad', cursor: {} })

    expect(simulations).toHaveLength(3)
  })

  it('should list simulations by reference month', async () => {
    const simulations = await ListSimulationsUseCase({ reference_month: new Date(), cursor: {} })

    expect(simulations).toHaveLength(4)
  })

  it('should list simulations by simulation code', async () => {
    const simulations = await ListSimulationsUseCase({ simulation_cd_id: '65d88285ca3af2f34df058ba', cursor: {} })

    expect(simulations).toHaveLength(1)
  })

  it('should list simulations with pagination', async () => {
    const simulations = await ListSimulationsUseCase({ cursor: { page: 1, limit: 2 } })

    expect(simulations).toHaveLength(2)
  })

  it('should list simulations with pagination and sort', async () => {
    const simulations = await ListSimulationsUseCase({ cursor: { page: 1, limit: 2, sort: 'status', order: 'asc' } })

    expect(simulations).toHaveLength(2)
    expect(simulations[0].status).toBe('error')
  })

  it('should list simulations with pagination and sort', async () => {
    const simulations = await ListSimulationsUseCase({ cursor: { page: 1, limit: 2, sort: 'status', order: 'desc' } })

    expect(simulations).toHaveLength(2)
    expect(simulations[0].status).toBe('success')
  })
})
