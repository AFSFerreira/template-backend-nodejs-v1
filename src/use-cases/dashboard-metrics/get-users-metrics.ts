import type { GetUsersMetricsUseCaseResponse } from '@custom-types/use-cases/dashboard-metrics/get-users-metrics'
import type { UsersRepository } from '@repositories/users-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { MembershipStatusType } from '@prisma/generated/enums'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetUsersMetricsUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
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
