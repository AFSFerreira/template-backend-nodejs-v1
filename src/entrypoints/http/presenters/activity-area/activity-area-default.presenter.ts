import type {
  ActivityAreaDefaultPresenterInput,
  HTTPActivityArea,
} from '@custom-types/http/presenter/activity-area/activity-area-default'

export const ActivityAreaDefaultPresenter = {
  toHTTP(input: ActivityAreaDefaultPresenterInput): HTTPActivityArea {
    return {
      area: input.area,
      type: input.type,
    }
  },

  toHTTPList(inputs: ActivityAreaDefaultPresenterInput[]): HTTPActivityArea[] {
    return inputs.map(this.toHTTP)
  },
}
