import { z } from 'zod'

export const nonemptyTextSchema = z.string().trim().nonempty().max(2000)
