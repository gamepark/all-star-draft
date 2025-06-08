import { getEnumValues } from '@gamepark/rules-api'
import { sampleSize } from 'lodash'

export enum HockeyPlayerCard {
  Rabbit1 = 111,
  Rabbit2 = 121,
  Rabbit3 = 131,
  Rabbit4 = 141,
  Rabbit5 = 155,
  Rabbit6 = 164,
  Rabbit7 = 173,
  Rabbit8 = 182,
  Rabbit9 = 196,

  Duck1 = 216,
  Duck2 = 221,
  Duck3 = 231,
  Duck4 = 241,
  Duck5 = 251,
  Duck6 = 265,
  Duck7 = 274,
  Duck8 = 283,
  Duck9 = 292,

  Beaver1 = 312,
  Beaver2 = 326,
  Beaver3 = 331,
  Beaver4 = 341,
  Beaver5 = 351,
  Beaver6 = 361,
  Beaver7 = 375,
  Beaver8 = 384,
  Beaver9 = 393,

  Eagle1 = 413,
  Eagle2 = 422,
  Eagle3 = 435,
  Eagle4 = 441,
  Eagle5 = 454,
  Eagle6 = 461,
  Eagle7 = 476,
  Eagle8 = 481,
  Eagle9 = 491,

  Penguin1 = 515,
  Penguin2 = 524,
  Penguin3 = 531,
  Penguin4 = 543,
  Penguin5 = 552,
  Penguin6 = 566,
  Penguin7 = 571,
  Penguin8 = 581,
  Penguin9 = 591,

  Panda1 = 613,
  Panda2 = 622,
  Panda3 = 636,
  Panda4 = 641,
  Panda5 = 651,
  Panda6 = 661,
  Panda7 = 671,
  Panda8 = 685,
  Panda9 = 694,

  Wolf1 = 714,
  Wolf2 = 723,
  Wolf3 = 732,
  Wolf4 = 746,
  Wolf5 = 751,
  Wolf6 = 761,
  Wolf7 = 771,
  Wolf8 = 781,
  Wolf9 = 795,

  Shark1 = 811,
  Shark2 = 821,
  Shark3 = 831,
  Shark4 = 845,
  Shark5 = 854,
  Shark6 = 863,
  Shark7 = 872,
  Shark8 = 886,
  Shark9 = 891,

  Tiger1 = 911,
  Tiger2 = 921,
  Tiger3 = 935,
  Tiger4 = 944,
  Tiger5 = 953,
  Tiger6 = 962,
  Tiger7 = 976,
  Tiger8 = 981,
  Tiger9 = 991,

  Horse1 = 1016,
  Horse2 = 1021,
  Horse3 = 1034,
  Horse4 = 1045,
  Horse5 = 1051,
  Horse6 = 1063,
  Horse7 = 1071,
  Horse8 = 1082,
  Horse9 = 1091,

  Reindeer1 = 1111,
  Reindeer2 = 1125,
  Reindeer3 = 1134,
  Reindeer4 = 1143,
  Reindeer5 = 1152,
  Reindeer6 = 1166,
  Reindeer7 = 1171,
  Reindeer8 = 1181,
  Reindeer9 = 1191,

  PolarBear1 = 1215,
  PolarBear2 = 1224,
  PolarBear3 = 1233,
  PolarBear4 = 1242,
  PolarBear5 = 1256,
  PolarBear6 = 1261,
  PolarBear7 = 1271,
  PolarBear8 = 1281,
  PolarBear9 = 1291
}

export enum HockeyPlayerCardSpeciesType {
  Rabbit = 1,
  Duck,
  Beaver,
  Eagle,
  Penguin,
  Panda,
  Wolf,
  Shark,
  Tiger,
  Horse,
  Reindeer,
  PolarBear
}

export enum HockeyPlayerCardSymbolsType {
  None = 1,
  Skate,
  Fist,
  Helmet,
  Puck,
  Rock
}

export const hockeyPlayerCards = getEnumValues(HockeyPlayerCard)

export const hockeyPlayerCardSpeciesTypes = getEnumValues(HockeyPlayerCardSpeciesType)

export const getHockeyPlayerCardSpecie = (cardId: HockeyPlayerCard): HockeyPlayerCardSpeciesType => Math.floor(cardId / 100)

export const getHockeyPlayerCardValue = (cardId: HockeyPlayerCard): number => Math.floor(cardId / 10) % 10

export const getHockeyPlayerCardSymbol = (cardId: HockeyPlayerCard): HockeyPlayerCardSymbolsType => cardId % 10

export const hockeyPlayerCardsBySpecies = hockeyPlayerCardSpeciesTypes.reduce(
  (previousRecord, currentType) => ({ ...previousRecord, [currentType]: hockeyPlayerCards.slice((currentType - 1) * 9, 9 * currentType) }),
  {} as Record<HockeyPlayerCardSpeciesType, HockeyPlayerCard[]>
)

export const selectHockeyPlayerCardsForRandomSpecies = (quantity: number): HockeyPlayerCard[] => {
  return sampleSize(hockeyPlayerCardSpeciesTypes, quantity).flatMap((specie) => hockeyPlayerCardsBySpecies[specie])
}
