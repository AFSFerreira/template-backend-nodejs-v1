import z from 'zod'
import { doiSchema } from '../../generic-components/doi-schema'
import { rangedYearSchema } from '../../primitives/ranged-year-schema'
import { uppercaseTextArraySchema } from '../../primitives/uppercase-text-array-schema'
import { upperCaseTextSchema } from '../../primitives/uppercase-text-schema'

export const academicPublicationsSchema = z.array(
  z.object({
    title: upperCaseTextSchema,
    authors: uppercaseTextArraySchema.min(1),
    publicationYear: rangedYearSchema,
    area: upperCaseTextSchema,
    journalName: upperCaseTextSchema,
    volume: upperCaseTextSchema,
    editionNumber: upperCaseTextSchema,
    startPage: upperCaseTextSchema,
    linkDoi: doiSchema,
  }),
)
