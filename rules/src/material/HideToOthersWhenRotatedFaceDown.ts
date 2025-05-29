import { HidingSecretsStrategy, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from './LocationType'
import { HockeyPlayerCardRotation } from './HockeyPlayerCardRotation'

export const hideToOthersWhenRotatedFaceDown: HidingSecretsStrategy<number, LocationType> = (
  item: MaterialItem<number, LocationType>,
  player?: number
): string[] => {
  if (item.location.rotation === HockeyPlayerCardRotation.FaceUp) {
    return []
  }
  return player !== item.location.player ? ['id'] : []
}
