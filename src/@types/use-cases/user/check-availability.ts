import type { CheckAvailabilityQuerySchemaType } from '@custom-types/schemas/user/check-availability-query-schema'

export interface CheckAvailabilityUseCaseRequest extends CheckAvailabilityQuerySchemaType {}

export interface CheckAvailabilityUseCaseResponse {
  availabilities: Record<string, boolean>
}
