import { z } from 'zod'

export function stripZodKeys<S extends z.ZodRawShape>(schema: z.ZodObject<S>) {
  const initialShape: { [K in keyof S]?: z.ZodUndefined } = {}
  const shape = Object.keys(schema.shape).reduce<{ [K in keyof S]: z.ZodUndefined }>(
    (acc, k) => {
      ;(acc as any)[k] = z.undefined()
      return acc
    },
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
    initialShape as { [K in keyof S]: z.ZodUndefined },
  )
  return z.object(shape) as z.ZodObject<{ [K in keyof S]: z.ZodUndefined }>
}
