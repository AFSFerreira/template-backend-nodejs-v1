export type HashedPassword = string & { readonly __brand: unique symbol }
