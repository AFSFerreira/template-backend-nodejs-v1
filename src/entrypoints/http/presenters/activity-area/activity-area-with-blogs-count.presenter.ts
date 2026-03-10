import type {
  ActivityAreaWithBlogsCountPresenterInput,
  HTTPActivityAreaWithBlogsCount,
} from '@custom-types/http/presenter/activity-area/activity-area-with-blogs-count'

export const ActivityAreaWithBlogsCountPresenter = {
  toHTTP(input: ActivityAreaWithBlogsCountPresenterInput): HTTPActivityAreaWithBlogsCount {
    return {
      area: input.area,
      blogsCount: input.blogsCount,
    }
  },

  toHTTPList(inputs: ActivityAreaWithBlogsCountPresenterInput[]): HTTPActivityAreaWithBlogsCount[] {
    return inputs.map(this.toHTTP)
  },
}
