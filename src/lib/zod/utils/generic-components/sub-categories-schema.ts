import z from 'zod'
import { uppercaseTextArraySchema } from '../primitives/uppercase-text-array-schema'
import { upperCaseTextSchema } from '../primitives/uppercase-text-schema'

export const subcategoriesSchema = z.union([uppercaseTextArraySchema, upperCaseTextSchema.transform((data) => [data])])
