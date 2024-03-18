import { z } from 'zod'

export const NewSessionDTO = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})
