import type z from 'zod'

export type UndefinedZodKeys<T> = { [K in keyof T]?: z.ZodUndefined }
