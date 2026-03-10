import type {
  HTTPInstitutionWithUsersCount,
  InstitutionWithUsersCountPresenterInput,
} from '@custom-types/http/presenter/institution/institution-with-users-count'

export const InstitutionWithUsersCountPresenter = {
  toHTTP(input: InstitutionWithUsersCountPresenterInput): HTTPInstitutionWithUsersCount {
    return {
      name: input.name,
      usersCount: input.usersCount,
    }
  },

  toHTTPList(inputs: InstitutionWithUsersCountPresenterInput[]): HTTPInstitutionWithUsersCount[] {
    return inputs.map(this.toHTTP)
  },
}
