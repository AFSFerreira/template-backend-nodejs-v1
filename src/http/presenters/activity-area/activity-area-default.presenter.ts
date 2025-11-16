import { ACTIVITY_AREA_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPActivityArea } from '@custom-types/presenter/activity-area/activity-area-default'
import { RegisterPresenter } from '@presenters/presenter-registry'
import type { ActivityArea } from '@prisma/client'

@RegisterPresenter(ACTIVITY_AREA_DEFAULT_PRESENTER_KEY)
export class ActivityAreaDefaultPresenter implements IPresenterStrategy<ActivityArea, HTTPActivityArea> {
  toHTTP(input: ActivityArea): HTTPActivityArea {
    return {
      area: input.area,
      type: input.type,
    }
  }
}
