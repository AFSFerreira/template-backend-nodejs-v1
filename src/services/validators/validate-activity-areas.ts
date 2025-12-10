import type { IValidateActivityAreas } from '@custom-types/custom/validate-activity-areas'
import { InvalidActivityArea } from '@use-cases/errors/user/invalid-activity-areas-error'
import stableStringify from 'json-stable-stringify'

export async function validateActivityAreas({ activityAreasRepository, activityAreas }: IValidateActivityAreas) {
  const activityAreasFound = await activityAreasRepository.findManyBy(activityAreas)

  const activityAreasFoundSet = new Set(
    activityAreasFound.map((activityArea) =>
      stableStringify({
        area: activityArea.area,
        type: activityArea.type,
      }),
    ),
  )

  const wrongActivityAreas = activityAreas.filter((activityArea) => {
    return !activityAreasFoundSet.has(stableStringify(activityArea))
  })

  if (wrongActivityAreas.length !== 0) {
    throw new InvalidActivityArea(
      wrongActivityAreas.map((activityArea) => JSON.stringify(activityArea, null, 2)).toString(),
    )
  }
}
