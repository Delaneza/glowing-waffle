import { z } from 'zod'

export const createScenarioDTO = z.object({
  name: z.string(),
  description: z.string(),
})
