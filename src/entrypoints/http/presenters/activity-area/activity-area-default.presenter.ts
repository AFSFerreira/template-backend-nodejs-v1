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
  public toHTTP(input: ActivityAreaDefaultPresenterInput): HTTPActivityArea
  public toHTTP(input: ActivityAreaDefaultPresenterInput[]): HTTPActivityArea[]
  public toHTTP(
    input: ActivityAreaDefaultPresenterInput | ActivityAreaDefaultPresenterInput[],
  ): HTTPActivityArea | HTTPActivityArea[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }
    return {
      area: input.area,
      type: input.type,
    }
  }
}
