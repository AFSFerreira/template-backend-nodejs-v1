import z from 'zod'

export const booleanSchema = z.preprocess((data) => (typeof data === 'string' ? data.toLowerCase() : data), z.union([z.literal('true'), z.literal('false')]).transform((data) => (data === 'true')))
