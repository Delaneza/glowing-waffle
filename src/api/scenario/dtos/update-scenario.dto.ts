import { z } from 'zod'

export const updateScenarioDTO = z.object({
  name: z.string(),
  description: z.string(),
})
