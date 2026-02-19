import z from 'zod'
import { nonemptyTextSchema } from './nonempty-text-schema'

export const nonemptyTextArraySchema = z.array(nonemptyTextSchema)
