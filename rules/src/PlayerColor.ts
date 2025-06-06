import { getEnumValues } from '@gamepark/rules-api'

export enum PlayerColor {
  Black = 1,
  Blue,
  Green,
  Purple,
  Red,
  Yellow
}

export const playerColors = getEnumValues(PlayerColor)
