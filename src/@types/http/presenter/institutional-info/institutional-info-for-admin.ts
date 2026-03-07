import type { InstitutionalInfo } from '@prisma/generated/client'
import { proseMirrorSchema } from '@http/schemas/utils/components/blog/prose-mirror-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import z from 'zod'

export interface InstitutionalInfoForAdminPresenterInput extends InstitutionalInfo {}

export const httpInstitutionalInfoForAdminSchema = z.object({
  aboutImage: nonemptyTextSchema,
  aboutDescription: proseMirrorSchema,
  statuteFile: nonemptyTextSchema,
  electionNoticeFile: nonemptyTextSchema,
})

export type HTTPInstitutionalInfoForAdmin = z.infer<typeof httpInstitutionalInfoForAdminSchema>
