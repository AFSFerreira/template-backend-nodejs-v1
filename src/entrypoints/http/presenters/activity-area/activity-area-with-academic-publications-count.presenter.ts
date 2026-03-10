import type {
  ActivityAreaWithAcademicPublicationsCountPresenterInput,
  HTTPActivityAreaWithAcademicPublicationsCount,
} from '@custom-types/http/presenter/academic-publication/activity-area-with-academic-publications-count'

export const ActivityAreaWithAcademicPublicationsCountPresenter = {
  toHTTP(
    input: ActivityAreaWithAcademicPublicationsCountPresenterInput,
  ): HTTPActivityAreaWithAcademicPublicationsCount {
    return {
      area: input.area,
      publicationsCount: input.publicationsCount,
    }
  },

  toHTTPList(
    inputs: ActivityAreaWithAcademicPublicationsCountPresenterInput[],
  ): HTTPActivityAreaWithAcademicPublicationsCount[] {
    return inputs.map(ActivityAreaWithAcademicPublicationsCountPresenter.toHTTP)
  },
}
