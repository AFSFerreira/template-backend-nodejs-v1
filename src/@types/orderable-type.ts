export const orderDirections = ['asc', 'desc'] as const
export const comparisonOperators = ['equals', 'gt', 'gte', 'lt', 'lte'] as const

export type OrderableType = (typeof orderDirections)[number]
export type ComparableType = (typeof comparisonOperators)[number]
