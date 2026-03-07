import type { AcademicPublicationWithDetails } from '@custom-types/validators/academic-publication-with-details'
import { nonemptyTextArraySchema } from '@lib/zod/utils/primitives/nonempty-text-array-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { numberSchema } from '@lib/zod/utils/primitives/number-schema'
import z from 'zod'

export interface AcademicPublicationDefaultPresenterInput extends AcademicPublicationWithDetails {}

export const httpAcademicPublicationSchema = z.object({
  title: nonemptyTextSchema,
  journalName: nonemptyTextSchema,
  publicationYear: numberSchema,
  volume: nonemptyTextSchema,
  editionNumber: nonemptyTextSchema,
  startPage: nonemptyTextSchema,
  linkDoi: nonemptyTextSchema,
  mainCategory: nonemptyTextSchema,
  authorsNames: nonemptyTextArraySchema,
})

export type HTTPAcademicPublication = z.infer<typeof httpAcademicPublicationSchema>
