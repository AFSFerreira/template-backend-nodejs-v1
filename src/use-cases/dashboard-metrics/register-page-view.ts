import type { RegisterPageViewUseCaseInput } from '@custom-types/use-cases/dashboard-metrics/register-page-view'
import { PageVisualizationCacheService } from '@services/caches/page-visualization-cache'
import { inject, singleton } from 'tsyringe'

@singleton()
export class RegisterPageViewUseCase {
  constructor(
    @inject(PageVisualizationCacheService)
    private readonly pageVisualizationCacheService: PageVisualizationCacheService,
  ) {}

  async execute({ ip }: RegisterPageViewUseCaseInput): Promise<boolean> {
    const registered = await this.pageVisualizationCacheService.registerPageView(ip)

    return registered
  }
}
