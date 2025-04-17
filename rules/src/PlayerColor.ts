import { getEnumValues } from '@gamepark/rules-api'

export enum PlayerColor {
  Black = 1,
  Blue,
  Green,
  Red,
  Purple,
  Yellow
}

export const playerColors = getEnumValues(PlayerColor)
