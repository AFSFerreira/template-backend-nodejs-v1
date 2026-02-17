import z from 'zod'

export const textSchema = z.coerce.string().trim()
