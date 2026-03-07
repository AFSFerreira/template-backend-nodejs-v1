import { ipSchema } from '@lib/zod/utils/primitives/ip-schema'
import { limitedNonemptyTextSchema } from '@lib/zod/utils/primitives/limited-nonempty-text-schema'
import { positiveIntegerSchema } from '@lib/zod/utils/primitives/positive-integer-schema'
import { z } from 'zod'

export const authenticateConnectionInfoSchema = z
  .object({
    ipAddress: ipSchema,
    browser: limitedNonemptyTextSchema,
    remotePort: z.union([limitedNonemptyTextSchema, positiveIntegerSchema]),
  })
  .partial()
