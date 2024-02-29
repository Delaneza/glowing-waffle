import { AppError } from '@shared/errors/app-error.error'
import { Simulation, SimulationDocument } from '../simulation.model'
import { DEFAULT_ERRORS } from './_errors'

export type ShowSimulationInput = {
  id: string
}

export async function ShowSimulationUseCase(input: ShowSimulationInput): Promise<SimulationDocument> {
  const simulation = await Simulation.findById(input.id)

  if (!simulation) {
    throw new AppError(DEFAULT_ERRORS.SIMULATION_NOT_FOUND_ERROR)
  }

  return simulation.view(true)
}
