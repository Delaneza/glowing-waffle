import { showSimulationUseCase } from '..'
import { Simulation } from '../../models'
import { SimulationDocument } from '../../models/simulation.model'

describe('show simulation usecase', () => {
  let defaultSimuation: SimulationDocument

  beforeEach(async () => {
    defaultSimuation = await Simulation.create({
      status: 'success',
      scenario: '65d88285ca3af2f34df058ad',
      reference_month: new Date(),
      simulation_cd_id: '65d88285ca3af2f34df058ba',
      user: '65d88285ca3af2f34df058ad',
    })
  })

  it('should show simulation', async () => {
    const simulation = await showSimulationUseCase({ id: defaultSimuation.id })

    expect(simulation).toEqual({
      id: defaultSimuation.id,
      status: 'success',
      scenario: expect.any(Object),
      reference_month: expect.any(Date),
      simulation_cd_id: '65d88285ca3af2f34df058ba',
      user: expect.any(Object),
      result: undefined,
      input: undefined,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should throw error when simulation not found', async () => {
    await expect(showSimulationUseCase({ id: '65d88285ca3af2f34df058aa' })).rejects.toThrow('Simulation not found')
  })
})
