export enum ArenaCard {
  ComboStadium1 = 11,
  ComboStadium2 = 21,
  ComboStadium3 = 31,
  DamStadium1 = 41,
  DamStadium2 = 51,
  DamStadium3 = 61,
  Polarena1 = 71,
  Polarena2 = 81,
  Polarena3 = 90,
  PuddlePark1 = 101,
  PuddlePark2 = 111,
  PuddlePark3 = 121,
  StadiumFall1 = 130,
  StadiumFall2 = 141,
  StadiumFall3 = 151
}

export const isArenaForTwoPlayer = (cardId: ArenaCard): boolean => cardId % 2 > 0
