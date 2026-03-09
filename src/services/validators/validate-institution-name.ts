import type { IValidateInstitutionName } from '@custom-types/services/validators/validate-institution-name'
import { getAllInstitutions } from '../externals/get-all-institutions'

/**
 * Valida se o nome de uma instituição existe no banco local ou na API externa de universidades.
 *
 * Combina as fontes via {@link getAllInstitutions} e compara case-insensitive.
 *
 * @returns `true` se a instituição for encontrada em qualquer uma das fontes.
 */
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
