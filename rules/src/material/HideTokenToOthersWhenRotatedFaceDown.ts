import { HidingSecretsStrategy, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from './LocationType'
import { MaterialRotation } from './MaterialRotation'

export const hideTokenToOthersWhenRotatedFaceDown: HidingSecretsStrategy<number, LocationType> = (
  item: MaterialItem<number, LocationType>,
  player?: number
): string[] => {
  if (player !== item.location.player && item.location.rotation === MaterialRotation.FaceDown) {
    return ['id.front']
  }
  return []
}
