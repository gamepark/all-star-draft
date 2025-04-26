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

export const isArenaForTwoPlayer = (cardId: ArenaCard): boolean => cardId !== ArenaCard.StadiumFall1 && cardId !== ArenaCard.Polarena3
