import type {
  HTTPInstitution,
  InstitutionDefaultPresenterInput,
} from '@custom-types/http/presenter/institution/institution-default'

export const InstitutionDefaultPresenter = {
  toHTTP(input: InstitutionDefaultPresenterInput): HTTPInstitution {
    return {
      id: input.publicId,
      name: input.name,
    }
  },

  toHTTPList(inputs: InstitutionDefaultPresenterInput[]): HTTPInstitution[] {
    return inputs.map(this.toHTTP)
  },
}
