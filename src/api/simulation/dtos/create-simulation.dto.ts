import { z } from 'zod'

export const CreateSimulationDTO = z.object({
  scenario: z.string(),
  reference_month: z.string(),
  simulation_cd_id: z.string(),
})
