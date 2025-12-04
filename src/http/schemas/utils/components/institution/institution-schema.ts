import z from 'zod'
import { upperCaseTextSchema } from '../../primitives/uppercase-text-schema'

export const institutionSchema = z.object({ name: upperCaseTextSchema })
