import { z } from 'zod'

export const CreateUserDTO = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
})
