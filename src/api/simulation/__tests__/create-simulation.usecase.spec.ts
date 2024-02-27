import { Scenario, ScenarioDocument } from "@src/api/scenario/scenario.module"
import { Simulation, SimulationDocument } from "../simulation.module"
import { CreateSimulationInput, CreateSimulationUseCase } from "../usecases/create-simulation.usecase"

describe('create simulation usecase', () => {
  let scenario: ScenarioDocument
  let payload: CreateSimulationInput
  let simulation: SimulationDocument

  beforeEach(async () => {
    scenario = await Scenario.create({ name: 'test', description: 'test', user: '65d88285ca3af2f34df058ad', })

    simulation = await Simulation.create({
      status: 'making obj',
      scenario: scenario.id,
      reference_month: new Date(),
      simulation_cd_id: '65d88285ca3af2f34df058bd',
      user: '65d88285ca3af2f34df058ad',
    })

    payload = {
      scenario: scenario.id,
      reference_month: new Date(),
      simulation_cd_id: '65d88285ca3af2f34df058ad',
      user: '65d88285ca3af2f34df058ad',
      sendEvent: jest.fn(),
      closeConnection: jest.fn()
    }
  })

  it('should create a simulation', async () => {
    await CreateSimulationUseCase(payload)

    const simulation = await Simulation.findOne({ simulation_cd_id: payload.simulation_cd_id })

    expect(simulation).toBeTruthy()
  })

  it('should throw an error if the scenario does not exist', async () => {
    payload.scenario = '65d88285ca3af2f34df058ad'

    await expect(CreateSimulationUseCase(payload)).rejects.toThrow('Scenario not found')
  })

  it('should throw an error if the simulation already exists', async () => {
    payload.simulation_cd_id = simulation.simulation_cd_id

    await expect(CreateSimulationUseCase(payload)).rejects.toThrow('Simulation already exists')
  })
})
