import type { Institution } from '@prisma/generated/client'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import z from 'zod'

export interface InstitutionDefaultPresenterInput extends Institution {}

export const httpInstitutionSchema = z.object({
  id: modelPublicIdSchema,
  name: nonemptyTextSchema,
})

export type HTTPInstitution = z.infer<typeof httpInstitutionSchema>
