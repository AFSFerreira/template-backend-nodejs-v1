import { ipSchema } from '@lib/zod/utils/primitives/ip-schema'
import { limitedNonemptyTextSchema } from '@lib/zod/utils/primitives/limited-nonempty-text-schema'
import { z } from 'zod'

export const authenticateConnectionInfoSchema = z
  .object({
    ipAddress: ipSchema,
    browser: limitedNonemptyTextSchema,
    remotePort: limitedNonemptyTextSchema,
  })
  .partial()
