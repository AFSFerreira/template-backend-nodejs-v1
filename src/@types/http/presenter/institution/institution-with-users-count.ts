import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { numberSchema } from '@lib/zod/utils/primitives/number-schema'
import z from 'zod'

export interface InstitutionWithUsersCountPresenterInput {
  name: string
  usersCount: number
}

export const httpInstitutionWithUsersCountSchema = z.object({
  name: nonemptyTextSchema,
  usersCount: numberSchema,
})

export type HTTPInstitutionWithUsersCount = z.infer<typeof httpInstitutionWithUsersCountSchema>
