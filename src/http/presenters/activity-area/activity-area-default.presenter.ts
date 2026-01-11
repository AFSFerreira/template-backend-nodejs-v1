import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPActivityArea } from '@custom-types/presenter/activity-area/activity-area-default'
import type { ActivityArea } from '@prisma/client'

export class ActivityAreaDefaultPresenter implements IPresenterStrategy<ActivityArea, HTTPActivityArea> {
  toHTTP(input: ActivityArea): HTTPActivityArea {
    return {
      area: input.area,
      type: input.type,
    }
  }
}
