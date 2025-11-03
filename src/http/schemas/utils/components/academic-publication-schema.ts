import z from "zod"
import { rangedYearSchema } from "../primitives/ranged-year-schema"
import { uppercaseTextArraySchema } from "../primitives/uppercase-text-array-schema"
import { upperCaseTextSchema } from "../primitives/uppercase-text-schema"
import { urlSchema } from "../primitives/url-schema"

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
    linkDoi: urlSchema,
  }),
)
