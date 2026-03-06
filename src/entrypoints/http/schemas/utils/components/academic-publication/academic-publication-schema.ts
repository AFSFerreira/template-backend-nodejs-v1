import { doiSchema } from '@lib/zod/utils/generic-components/doi-schema'
import { rangedYearSchema } from '@lib/zod/utils/primitives/ranged-year-schema'
import { uppercaseTextArraySchema } from '@lib/zod/utils/primitives/uppercase-text-array-schema'
import { upperCaseTextSchema } from '@lib/zod/utils/primitives/uppercase-text-schema'
import z from 'zod'

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
