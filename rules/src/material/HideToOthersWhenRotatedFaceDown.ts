import { HidingSecretsStrategy, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from './LocationType'
import { MaterialRotation } from './MaterialRotation'
import { has, isObject } from 'lodash'

export const hideToOthersWhenRotatedFaceDown: HidingSecretsStrategy<number, LocationType> = (
  item: MaterialItem<number, LocationType>,
  player?: number
): string[] => {
  if (item.location.rotation !== MaterialRotation.FaceDown) {
    return []
  }
  if (player !== item.location.player) {
    if (isObject(item.id) && has(item.id, 'front')) return ['id.front']
    return ['id']
  }
  return []
}
