import type { Address } from "@prisma/generated/client"

export interface AddressDefaultPresenterInput extends Address {}

export interface HTTPAddress {
  zip: string
  number: string
  street: string
  district: string
  city: string
  complement: string | null
}
