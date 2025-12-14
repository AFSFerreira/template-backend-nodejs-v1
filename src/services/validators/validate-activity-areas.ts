import type { IValidateActivityAreas } from '@custom-types/custom/validate-activity-areas'
import { InvalidActivityArea } from '@use-cases/errors/user/invalid-activity-areas-error'

export async function validateActivityAreas({ activityAreasRepository, activityAreas }: IValidateActivityAreas) {
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
    throw new InvalidActivityArea(
      wrongActivityAreas.map((activityArea) => JSON.stringify(activityArea, null, 2)).toString(),
    )
  }

  return activityAreasFound
}
