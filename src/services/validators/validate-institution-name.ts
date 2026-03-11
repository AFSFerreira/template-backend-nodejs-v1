import { InstitutionService } from '@services/externals/get-all-institutions'
import { inject, injectable } from 'tsyringe'

@injectable()
export class InstitutionValidationService {
  constructor(
    @inject(InstitutionService)
    private readonly institutionService: InstitutionService,
  ) {}

  async validate(institution: string) {
    const formattedInstitution = institution.toUpperCase()

    const institutionsNames = await this.institutionService.getAllInstitutions({
      name: institution,
      limit: Number.MAX_SAFE_INTEGER,
    })

    return institutionsNames.some((value) => value.toUpperCase() === formattedInstitution)
  }
}
