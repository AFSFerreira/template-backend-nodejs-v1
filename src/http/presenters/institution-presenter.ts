import type { InstitutionsUsersCount } from '@repositories/institutions-repository'

interface HTTPInstitution {
  name: string
  usersCount: number
}

export class InstitutionPresenter {
  static toHTTP(institutionUsersCount: InstitutionsUsersCount): HTTPInstitution
  static toHTTP(institutionUsersCount: InstitutionsUsersCount[]): HTTPInstitution[]
  static toHTTP(input: InstitutionsUsersCount | InstitutionsUsersCount[]): HTTPInstitution | HTTPInstitution[] {
    if (Array.isArray(input)) {
      return input.map((institution) => InstitutionPresenter.toHTTP(institution))
    }

    return {
      name: input.name,
      usersCount: input.usersCount,
    }
  }
}
