import { S3Service, SQSService } from '@services/aws'
import { conflictError, notFoundError } from '@shared/errors/default-errors.error'
import { Scenario } from '@src/api/scenario/models'
import { Simulation } from '../../models'

export type CreateSimulationInput = {
  scenario: string
  reference_month: Date
  simulation_cd_id: string
  user: string
  sendEvent(data: any): void
  closeConnection(): void
}

type SimulationInputObject = {
  simulation: string
  simulationCode: string
  simulationName: string
  scenario: string
}

export async function createSimulationUseCase(data: CreateSimulationInput) {
  const scenario = await Scenario.findById(data.scenario)

  if (!scenario) {
    throw notFoundError('scenario', data.scenario)
  }

  const simulationExists = await Simulation.findOne({ simulation_cd_id: data.simulation_cd_id })

  if (simulationExists) {
    throw conflictError('simulation', `Simulação com o código "${data.simulation_cd_id}" já existe`)
  }

  const { sendEvent, closeConnection } = data

  sendEvent({ status: 'making obj' })

  const simulation = await Simulation.create({
    status: 'making obj',
    scenario: data.scenario,
    reference_month: data.reference_month,
    simulation_cd_id: data.simulation_cd_id,
    user: data.user,
  })

  const simulationInputObject: SimulationInputObject = {
    simulation: simulation.id,
    simulationCode: simulation.simulation_cd_id,
    simulationName: `#${scenario.name} - ${scenario.createdAt.toISOString()}`,
    scenario: scenario.id,
  }

  await generateInputSimulation(simulationInputObject, sendEvent, closeConnection)
}

async function generateInputSimulation(data: SimulationInputObject, sendEvent: Function, closeConnection: Function) {
  const fullObject = {}

  sendEvent({ status: 'in progress' })

  fullObject['init_date'] = new Date().toISOString()
  fullObject['end_date'] = new Date().toISOString()

  fullObject['demands'] = [
    { demand: 'demand1', value: 10 },
    { demand: 'demand2', value: 30 },
    { demand: 'demand3', value: 20 },
  ]

  fullObject['maintenances'] = [
    { maintenance: 'maintenance1', date: new Date().toISOString() },
    { maintenance: 'maintenance2', date: new Date().toISOString() },
    { maintenance: 'maintenance3', date: new Date().toISOString() },
  ]

  await Simulation.findByIdAndUpdate(data.simulation, { status: 'success', result: fullObject })

  const config = {
    bucket: 'bucket',
    key: 'key',
  }

  const s3Service = new S3Service(config)
  s3Service.putObject({
    Bucket: config.bucket,
    Key: config.key,
    Body: JSON.stringify(fullObject),
  })

  const sqsService = new SQSService(config)
  sqsService.sendMessage({
    MessageBody: JSON.stringify(fullObject),
    QueueUrl: 'queueUrl',
  })

  sendEvent({ status: 'success', result: fullObject })
  closeConnection()
}
