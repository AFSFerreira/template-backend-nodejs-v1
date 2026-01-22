import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  ActivityAreaDefaultPresenterInput,
  HTTPActivityArea,
} from '@custom-types/http/presenter/activity-area/activity-area-default'

export class ActivityAreaDefaultPresenter
  implements IPresenterStrategy<ActivityAreaDefaultPresenterInput, HTTPActivityArea>
{
  toHTTP(input: ActivityAreaDefaultPresenterInput): HTTPActivityArea {
    return {
      area: input.area,
      type: input.type,
    }
  }
}
