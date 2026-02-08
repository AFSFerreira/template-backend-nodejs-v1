import type { NodeSystemError } from '@custom-types/custom/node-system-error'

export function isNodeSystemError(error: unknown): error is NodeSystemError {
  return error instanceof Error && 'code' in error
}
