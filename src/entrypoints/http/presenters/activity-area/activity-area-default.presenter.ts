import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  ActivityAreaDefaultPresenterInput,
  HTTPActivityArea,
} from '@custom-types/http/presenter/activity-area/activity-area-default'
import { singleton } from 'tsyringe'

@singleton()
export class ActivityAreaDefaultPresenter
  implements IPresenterStrategy<ActivityAreaDefaultPresenterInput, HTTPActivityArea>
{
  public toHTTP(input: ActivityAreaDefaultPresenterInput): HTTPActivityArea {
    return {
      area: input.area,
      type: input.type,
    }
  }

  toHTTPList(inputs: ActivityAreaDefaultPresenterInput[]): HTTPActivityArea[] {
    return inputs.map((input) => this.toHTTP(input))
  }
}
