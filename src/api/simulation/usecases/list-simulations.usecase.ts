import { Simulation, SimulationDocument } from '../simulation.model'

type Cursor = {
  page?: number
  limit?: number
  sort?: string
  order?: string
}

export type ListSimulationsInput = {
  name?: string
  status?: string
  scenario?: string
  reference_month?: Date
  simulation_cd_id?: string
  user?: string
  cursor: Cursor
}

export async function ListSimulationsUseCase(input: ListSimulationsInput): Promise<SimulationDocument[]> {
  const { cursor } = input
  const { page = 1, limit = 10, sort = 'createdAt', order = 'desc' } = cursor

  const skip = (page - 1) * limit

  const searchableFields = ['status', 'scenario', 'simulation_cd_id', 'user']

  const query = searchableFields.reduce((acc, field) => {
    if (input[field]) {
      if (field === 'name') {
        return { ...acc, [field]: { $regex: input[field] || '', $options: 'i' } }
      }

      return { ...acc, [field]: input[field] }
    }

    return acc
  }, {})

  const sortQuery = { sort: { [sort]: order === 'desc' ? -1 : 1 } }

  const simulations = await Simulation.find(query, {}, sortQuery).skip(skip).limit(limit).exec()

  return simulations.map((simulation) => simulation.view(false))
}
