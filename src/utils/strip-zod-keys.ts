import z from 'zod'

export function stripZodKeys<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  const shape = Object.fromEntries(
    Object.keys(schema.shape).map((k) => [k, z.undefined()]),
  )
  return z.object(shape)
}
