import { z } from 'zod'

export const authenticateBodySchema = z.object({
  emailOrUsername: z.union([z.string().nonempty().email(), z.string().min(4)]),
  password: z.string().nonempty(),
})

export type AuthenticaticationSchemaType = z.infer<
  typeof authenticateBodySchema
>
