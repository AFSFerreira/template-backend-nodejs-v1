import type { IValidateActivityAreas, IValidatedActivityAreas } from '@custom-types/custom/validate-activity-areas'

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
