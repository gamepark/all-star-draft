import { HidingSecretsStrategy, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from './LocationType'
import { MaterialRotation } from './MaterialRotation'

export const hideCardToEveryoneWhenRotatedFaceDown: HidingSecretsStrategy<number, LocationType> = (
  item: MaterialItem<number, LocationType>,
  player?: number
): string[] => {
  if (item.location.rotation === MaterialRotation.FaceDown) {
    return ['id']
  }
  return player !== item.location.player ? ['id'] : []
}
