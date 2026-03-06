import { upperCaseTextSchema } from '@lib/zod/utils/primitives/uppercase-text-schema'
import z from 'zod'

export const institutionSchema = z.object({ name: upperCaseTextSchema })
