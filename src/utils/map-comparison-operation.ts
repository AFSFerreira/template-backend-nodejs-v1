import type { ComparableType } from '@custom-types/orderable'

export function mapComparisonOperation(operation: ComparableType) {
  switch (operation) {
    case 'equals':
      return '='
    case 'lt':
      return '<'
    case 'lte':
      return '<='
    case 'gt':
      return '>'
    case 'gte':
      return '>='
    default:
      return '='
  }
}
