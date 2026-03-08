import type { IValidateInstitutionName } from '@custom-types/services/validators/validate-institution-name'
import { getAllInstitutions } from '../externals/get-all-institutions'

export async function validateInstitutionName({ institutionsRepository, institution }: IValidateInstitutionName) {
  const formattedInstitution = institution.toUpperCase()

  const institutionsNames = await getAllInstitutions({
    institutionsRepository,
    query: {
      name: institution,
      limit: Number.MAX_SAFE_INTEGER,
    },
  })

  return institutionsNames.some((value) => value.toUpperCase() === formattedInstitution)
}
