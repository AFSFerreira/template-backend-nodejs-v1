import type { RegisterPageViewUseCaseInput } from '@custom-types/use-cases/dashboard-metrics/register-page-view'
import { redis } from '@lib/redis'
import { registerPageView } from '@services/caches/page-visualization-cache'
import { injectable } from 'tsyringe'

@injectable()
export class RegisterPageViewUseCase {
  async execute({ ip }: RegisterPageViewUseCaseInput): Promise<boolean> {
    const registered = await registerPageView({ ip, redis })

    return registered
  }
}
