import type {
  IValidateActivityAreas,
  IValidatedActivityAreas,
} from '@custom-types/services/validators/validate-activity-areas'

/**
 * Valida combinações de área + tipo de atividade contra o repositório de áreas cadastradas.
 *
 * Compara cada par `(area, type)` recebido com os registros existentes no banco.
 * Retorna as áreas inválidas caso alguma combinação não seja encontrada.
 *
 * @returns Objeto com `success: true` e as áreas encontradas, ou `success: false` e as áreas inválidas.
 */
export async function validateActivityAreas({
  activityAreasRepository,
  activityAreas,
}: IValidateActivityAreas): Promise<IValidatedActivityAreas> {
  const activityAreasFound = await activityAreasRepository.findManyBy(activityAreas)

  // NOTE: Se esta verificação provocar problemas eventualmente,
  // considerar usar o stableStringify para simplificar o processo
  const activityAreasFoundSet = new Set(
    activityAreasFound.map((activityArea) => `${activityArea.area}:${activityArea.type}`),
  )

  const wrongActivityAreas = activityAreas.filter((activityArea) => {
    return !activityAreasFoundSet.has(`${activityArea.area}:${activityArea.type}`)
  })

  if (wrongActivityAreas.length !== 0) {
    return { validatedActivityAreas: wrongActivityAreas, success: false }
  }

  return { validatedActivityAreas: activityAreasFound, success: true }
}
