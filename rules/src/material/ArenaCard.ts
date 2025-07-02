import { getEnumValues } from '@gamepark/rules-api'
import { IrregularAttribute } from './TeamStrength'

export enum ArenaCard {
  ComboStadium1 = 1,
  ComboStadium2,
  ComboStadium3,
  DamStadium1,
  DamStadium2,
  DamStadium3,
  Polarena1,
  Polarena2,
  Polarena3,
  PuddlePark1,
  PuddlePark2,
  PuddlePark3,
  StadiumFall1,
  StadiumFall2,
  StadiumFall3
}

export const arenaCards = getEnumValues(ArenaCard)

export const isArenaForTwoPlayer = (cardId: ArenaCard): boolean => cardId !== ArenaCard.StadiumFall1 && cardId !== ArenaCard.Polarena3

export const isArenaWithIrregularFanCount = (cardId: ArenaCard): boolean =>
  [ArenaCard.Polarena3, ArenaCard.DamStadium1, ArenaCard.DamStadium2, ArenaCard.DamStadium3].includes(cardId)

export const arenaCardsForTwoPlayers = arenaCards.filter((id) => isArenaForTwoPlayer(id))

export const arenasFanPoints: Record<ArenaCard, number[]> = {
  [ArenaCard.ComboStadium1]: [21, 18, 15, 12, 9, 6],
  [ArenaCard.ComboStadium2]: [22, 20, 17, 15, 13, 11],
  [ArenaCard.ComboStadium3]: [18, 16, 14, 12, 10, 8],
  [ArenaCard.DamStadium1]: [7, 10, 12, 13, 15, 18],
  [ArenaCard.DamStadium2]: [10, 9, 7, 5, 6, 8],
  [ArenaCard.DamStadium3]: [13, 14, 16, 13, 11, 9],
  [ArenaCard.Polarena1]: [16, 15, 12, 11, 7, 6],
  [ArenaCard.Polarena2]: [14, 13, 11, 8, 6, 5],
  [ArenaCard.Polarena3]: [0, 4, 5, 7, 8, 12],
  [ArenaCard.PuddlePark1]: [15, 13, 11, 9, 6, 3],
  [ArenaCard.PuddlePark2]: [11, 10, 8, 5, 3, 2],
  [ArenaCard.PuddlePark3]: [20, 17, 15, 14, 12, 9],
  [ArenaCard.StadiumFall1]: [17, 12, 8, 5, 3, 2],
  [ArenaCard.StadiumFall2]: [19, 18, 16, 13, 9, 4],
  [ArenaCard.StadiumFall3]: [13, 10, 7, 5, 3, 1]
}

export const arenaIrregularAttribute: Partial<Record<ArenaCard, IrregularAttribute>> = {
  [ArenaCard.ComboStadium1]: IrregularAttribute.OneOfEach,
  [ArenaCard.ComboStadium2]: IrregularAttribute.Straight,
  [ArenaCard.ComboStadium3]: IrregularAttribute.FullHouse
}
