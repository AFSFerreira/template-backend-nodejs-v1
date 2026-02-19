import z from 'zod'

export const institutionSourceSchema = z.union([z.literal('internal'), z.literal('external')])
