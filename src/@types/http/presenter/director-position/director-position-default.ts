import type { DirectorPosition } from '@prisma/generated/client'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { nullableTextSchema } from '@lib/zod/utils/primitives/nullable-text-schema'
import { numberSchema } from '@lib/zod/utils/primitives/number-schema'
import z from 'zod'

export interface DirectorPositionDefaultPresenterInput extends DirectorPosition {}

const httpDirectorPositionSchema = z.object({
  id: modelPublicIdSchema,
  position: nonemptyTextSchema,
  precedence: numberSchema,
  description: nullableTextSchema,
})

export type HTTPDirectorPosition = z.infer<typeof httpDirectorPositionSchema>
