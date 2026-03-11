import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  ActivityAreaWithBlogsCountPresenterInput,
  HTTPActivityAreaWithBlogsCount,
} from '@custom-types/http/presenter/activity-area/activity-area-with-blogs-count'
import { singleton } from 'tsyringe'

@singleton()
export class ActivityAreaWithBlogsCountPresenter
  implements IPresenterStrategy<ActivityAreaWithBlogsCountPresenterInput, HTTPActivityAreaWithBlogsCount>
{
  public toHTTP(input: ActivityAreaWithBlogsCountPresenterInput): HTTPActivityAreaWithBlogsCount {
    return {
      area: input.area,
      blogsCount: input.blogsCount,
    }
  }

  toHTTPList(inputs: ActivityAreaWithBlogsCountPresenterInput[]): HTTPActivityAreaWithBlogsCount[] {
    return inputs.map((input) => this.toHTTP(input))
  }
}
