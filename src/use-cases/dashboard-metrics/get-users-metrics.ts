import type { GetUsersMetricsUseCaseResponse } from '@custom-types/use-cases/dashboard-metrics/get-users-metrics'
import type { UsersRepository } from '@repositories/users-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { MembershipStatusType } from '@prisma/client'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetUsersMetricsUseCase {
  constructor(
    @inject(tokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(): Promise<GetUsersMetricsUseCaseResponse> {
    const totalActiveUsers = await this.usersRepository.totalCount({ membershipStatus: MembershipStatusType.ACTIVE })

    const totalPendingUsers = await this.usersRepository.totalCount({ membershipStatus: MembershipStatusType.PENDING })

    const totalInactiveUsers = await this.usersRepository.totalCount({
      membershipStatus: MembershipStatusType.INACTIVE,
    })

    const totalUsers = await this.usersRepository.totalCount()

    return {
      totalActiveUsers,
      totalPendingUsers,
      totalInactiveUsers,
      totalUsers,
    }
  }
}
