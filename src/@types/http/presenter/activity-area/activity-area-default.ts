import type { ActivityArea } from '@prisma/generated/client'
import { activityAreaEnumSchema } from '@lib/zod/utils/enums/activity-area-enum-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import z from 'zod'

export interface ActivityAreaDefaultPresenterInput extends ActivityArea {}

export const httpActivityAreaSchema = z.object({
  area: nonemptyTextSchema,
  type: activityAreaEnumSchema,
})

export type HTTPActivityArea = z.infer<typeof httpActivityAreaSchema>
