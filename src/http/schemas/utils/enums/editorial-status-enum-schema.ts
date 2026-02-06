import { EditorialStatusType } from '@prisma/generated/enums'
import z from 'zod'

export const editorialStatusEnumSchema = z.enum(EditorialStatusType)
