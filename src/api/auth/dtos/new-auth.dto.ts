import { z } from 'zod'

export const NewAuthDTO = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})
