import { getEnumValues } from '@gamepark/rules-api'
import { PlayerColor, playerColors } from '../PlayerColor'

export enum BusToken {
  Black1 = 10,
  Black2,
  Black3,
  Blue1 = 20,
  Blue2,
  Blue3,
  Green1 = 30,
  Green2,
  Green3,
  Purple1 = 40,
  Purple2,
  Purple3,
  Red1 = 50,
  Red2,
  Red3,
  Yellow1 = 60,
  Yellow2,
  Yellow3
}

export type BusTokenId = {
  front?: BusToken
  back: PlayerColor
}

export type KnownBusTokenId = Required<BusTokenId>

export const busTokens = getEnumValues(BusToken)

export const getBusTokenValue = (busId: BusToken): number => (busId % 10) + 1

export const busTokensByPlayerColor: Record<PlayerColor, BusToken[]> = playerColors.reduce(
  (previousRecord, currentColor) => ({ ...previousRecord, [currentColor]: busTokens.slice((currentColor - 1) * 3, currentColor * 3) }),
  {} as Record<PlayerColor, BusToken[]>
)
