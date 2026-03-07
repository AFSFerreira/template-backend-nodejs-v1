import type { InstitutionalInfo } from '@prisma/generated/client'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import z from 'zod'

export interface InstitutionalInfoPresenterInput extends InstitutionalInfo {}

const httpInstitutionalInfoSchema = z.object({
  aboutImage: nonemptyTextSchema,
  statuteFile: nonemptyTextSchema,
  electionNoticeFile: nonemptyTextSchema,
})

export type HTTPInstitutionalInfo = z.infer<typeof httpInstitutionalInfoSchema>
