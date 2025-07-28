export const orderDirections = ['asc', 'desc'] as const
export const comparisonOperators = ['eq', 'gt', 'gte', 'lt', 'lte'] as const

export type OrderableType = (typeof orderDirections)[number]
export type ComparisonOperators = (typeof comparisonOperators)[number]
