import { getEnumValues } from '@gamepark/rules-api'

export enum TieBreakerCard {
  PlayerNumber_2_4 = 1,
  PlayerNumber_5_6
}

export const tieBreakerCards = getEnumValues(TieBreakerCard)
