import { getEnumValues } from '@gamepark/rules-api'

export enum RegularSeasonGameMode {
  Duel = 1,
  OpenMarket,
  Heritage
}

export const regularSeasonGameMode = getEnumValues(RegularSeasonGameMode)
