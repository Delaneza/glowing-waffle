import { z } from 'zod'

export const deleteManyScenariosDTO = z.object({
  ids: z.array(z.string()),
})
