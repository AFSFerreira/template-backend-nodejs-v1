import { EditorialStatusType } from '@prisma/client'
import z from 'zod'

export const editorialStatusEnumSchema = z.enum(EditorialStatusType)
