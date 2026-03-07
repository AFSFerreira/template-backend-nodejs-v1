import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { numberSchema } from '@lib/zod/utils/primitives/number-schema'
import z from 'zod'

export interface AddressWithUsersCountPresenterInput {
  state: string
  usersCount: number
}

const httpAddressStatesSchema = z.object({
  state: nonemptyTextSchema,
  usersCount: numberSchema,
})

export type HTTPAddressStates = z.infer<typeof httpAddressStatesSchema>
