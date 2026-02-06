import type { UpdateAddressQuery } from '@custom-types/repository/prisma/address/update-address-query'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import type { Prisma } from '@prisma/generated/client'
import { inject, injectable } from 'tsyringe'
import type { AddressesRepository } from '../addresses-repository'

@injectable()
export class PrismaAddressesRepository implements AddressesRepository {
  constructor(
    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}
  async create(data: Prisma.AddressUncheckedCreateInput) {
    const address = await this.dbContext.client.address.create({ data })
    return address
  }

  async findBy(where: Prisma.AddressWhereInput) {
    const address = await this.dbContext.client.address.findFirst({ where })
    return address
  }

  async delete(id: number) {
    await this.dbContext.client.address.delete({
      where: { id },
    })
  }

  async update({ id, data }: UpdateAddressQuery) {
    const address = await this.dbContext.client.address.update({
      where: { id },
      data,
    })
    return address
  }
}
