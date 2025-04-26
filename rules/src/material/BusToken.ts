import { getEnumValues } from '@gamepark/rules-api'
import { PlayerColor, playerColors } from '../PlayerColor'

export enum BusToken {
  Black1 = 1,
  Black2,
  Black3,
  Blue1,
  Blue2,
  Blue3,
  Green1,
  Green2,
  Green3,
  Purple1,
  Purple2,
  Purple3,
  Red1,
  Red2,
  Red3,
  Yellow1,
  Yellow2,
  Yellow3
}

export type BusTokenId = {
  front?: BusToken
  back: PlayerColor
}

export type KnownBusTokenId = Required<BusTokenId>

export const busTokens = getEnumValues(BusToken)

export const busTokensByPlayerColor = playerColors.reduce(
  (previousRecord, currentColor) => ({ ...previousRecord, [currentColor]: busTokens.slice((currentColor - 1) * 3, currentColor * 3) }),
  {}
)
