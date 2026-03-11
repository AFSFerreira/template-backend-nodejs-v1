import type { IValidatedActivityAreas } from '@custom-types/services/validators/validate-activity-areas'
import type { PartialActivityAreas } from '@custom-types/validators/partial-activity-areas'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ActivityAreaValidationService {
  constructor(
    @inject(tsyringeTokens.repositories.activityAreas)
    private readonly activityAreasRepository: ActivityAreasRepository,
  ) {}

  async validate(activityAreas: PartialActivityAreas): Promise<IValidatedActivityAreas> {
    const activityAreasFound = await this.activityAreasRepository.findManyBy(activityAreas)

    const activityAreasFoundSet = new Set(
      activityAreasFound.map((activityArea) => `${activityArea.area}:${activityArea.type}`),
    )

    const wrongActivityAreas = activityAreas.filter((activityArea) => {
      return !activityAreasFoundSet.has(`${activityArea.area}:${activityArea.type}`)
    })

    if (wrongActivityAreas.length !== 0) {
      return { validatedActivityAreas: wrongActivityAreas, success: false }
    }

    return { validatedActivityAreas: activityAreasFound, success: true }
  }
}
