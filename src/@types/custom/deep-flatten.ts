type FlattenToUnion<T> = T extends object
  ? {
      // biome-ignore lint/suspicious/noExplicitAny: <necessário para extração genérica de tipos>
      [K in keyof T]-?: NonNullable<T[K]> extends any[]
        ? { [P in K]: T[K] }
        : NonNullable<T[K]> extends object
          ? FlattenToUnion<NonNullable<T[K]>>
          : { [P in K]: T[K] }
    }[keyof T]
  : T

type UnionToIntersection<U> =
  // biome-ignore lint/suspicious/noExplicitAny: <necessário para extração genérica de tipos>
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

export type DeepFlatten<T> = {
  [K in keyof UnionToIntersection<FlattenToUnion<T>>]: UnionToIntersection<FlattenToUnion<T>>[K]
}
