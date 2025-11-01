import { z } from 'zod'

type UndefinedZodKeys<T> = { [K in keyof T]?: z.ZodUndefined }

export function stripZodKeys<S extends z.ZodRawShape>(schema: z.ZodObject<S>) {
  const initialShape: UndefinedZodKeys<S> = {}
  const shape = Object.keys(schema.shape).reduce<UndefinedZodKeys<S>>((acc, k) => {
    ;(acc as any)[k] = z.undefined()
    return acc
  }, initialShape)
  return z.object(shape) as z.ZodObject<UndefinedZodKeys<S>>
}
