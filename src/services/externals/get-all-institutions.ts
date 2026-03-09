import type { IGetAllInstitutions } from '@custom-types/services/external/get-all-institutions'
import { getExternalInstitutions } from './get-external-institutions'

/**
 * Combina instituições da API externa de universidades com as cadastradas no banco local.
 *
 * Mescla as duas fontes em uma lista única sem duplicatas (case-sensitive),
 * priorizando as externas e complementando com as locais.
 *
 * @param institutionsRepository - Repositório de instituições locais.
 * @param query - Filtros de busca (nome, limite, página).
 * @returns Lista unificada de nomes de instituições em uppercase.
 */
export async function getAllInstitutions({ institutionsRepository, query }: IGetAllInstitutions) {
  const universityName = query.name
  const limit = query.limit ?? 10
  const page = query.page ?? 1

  // NOTE: Feito com listas porque o uso de conjuntos
  // não permitiria uma paginação sob o array de maneira determinística:
  const allInstitutions: string[] = []

  const externalInstitutions = await getExternalInstitutions(universityName)

  for (const externalInstitution of externalInstitutions) {
    if (allInstitutions.includes(externalInstitution)) continue

    allInstitutions.push(externalInstitution)
  }

  const allSystemInstitutions = await institutionsRepository.listAllInstitutionsNames({
    name: universityName,
    limit,
    page,
  })

  for (const institution of allSystemInstitutions.data) {
    const formattedName = institution.name.trim().toUpperCase()

    if (allInstitutions.includes(formattedName)) continue

    allInstitutions.push(formattedName)
  }

  return allInstitutions
}
