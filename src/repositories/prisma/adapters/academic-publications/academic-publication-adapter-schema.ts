import { dateSchema } from '@lib/zod/utils/primitives/date-schema'
import { nonemptyTextArraySchema } from '@lib/zod/utils/primitives/nonempty-text-array-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { positiveIntegerSchema } from '@lib/zod/utils/primitives/positive-integer-schema'
import z from 'zod'

export const academicPublicationAdapterSchema = z
  .object({
    id: positiveIntegerSchema,
    title: nonemptyTextSchema,
    journal_name: nonemptyTextSchema,
    publication_year: positiveIntegerSchema,
    volume: nonemptyTextSchema,
    edition_number: nonemptyTextSchema,
    start_page: nonemptyTextSchema,
    link_doi: nonemptyTextSchema,
    created_at: dateSchema,
    authors: nonemptyTextArraySchema,
    main_category: nonemptyTextSchema,
  })
  .transform((raw) => ({
    id: raw.id,
    title: raw.title,
    journalName: raw.journal_name,
    publicationYear: raw.publication_year,
    volume: raw.volume,
    editionNumber: raw.edition_number,
    startPage: raw.start_page,
    linkDoi: raw.link_doi,
    createdAt: raw.created_at,
    authorsNames: raw.authors,
    mainCategory: raw.main_category,
  }))
