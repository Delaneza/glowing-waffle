import { notFoundError } from '@shared/errors/default-errors.error'
import { Simulation, SimulationDocument } from '../../models/simulation.model'

export type ShowSimulationInput = {
  id: string
}

export async function showSimulationUseCase(input: ShowSimulationInput): Promise<SimulationDocument> {
  const simulation = await Simulation.findById(input.id)

  if (!simulation) {
    throw notFoundError('simulation', input.id)
  }

  return simulation.view(true)
}
