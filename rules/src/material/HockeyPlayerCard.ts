import { getEnumValues } from '@gamepark/rules-api'
import { sampleSize } from 'lodash'

export enum HockeyPlayerCard {
  Beaver1 = 112,
  Beaver2 = 126,
  Beaver3 = 131,
  Beaver4 = 141,
  Beaver5 = 151,
  Beaver6 = 161,
  Beaver7 = 175,
  Beaver8 = 184,
  Beaver9 = 193,
  Duck1 = 216,
  Duck2 = 221,
  Duck3 = 231,
  Duck4 = 241,
  Duck5 = 251,
  Duck6 = 265,
  Duck7 = 274,
  Duck8 = 283,
  Duck9 = 292,
  Eagle1 = 313,
  Eagle2 = 322,
  Eagle3 = 335,
  Eagle4 = 341,
  Eagle5 = 354,
  Eagle6 = 361,
  Eagle7 = 376,
  Eagle8 = 381,
  Eagle9 = 391,
  Horse1 = 416,
  Horse2 = 421,
  Horse3 = 434,
  Horse4 = 445,
  Horse5 = 451,
  Horse6 = 463,
  Horse7 = 471,
  Horse8 = 482,
  Horse9 = 491,
  Reindeer1 = 511,
  Reindeer2 = 525,
  Reindeer3 = 534,
  Reindeer4 = 543,
  Reindeer5 = 552,
  Reindeer6 = 566,
  Reindeer7 = 571,
  Reindeer8 = 581,
  Reindeer9 = 591,
  Panda1 = 613,
  Panda2 = 622,
  Panda3 = 636,
  Panda4 = 641,
  Panda5 = 651,
  Panda6 = 661,
  Panda7 = 671,
  Panda8 = 685,
  Panda9 = 694,
  Penguin1 = 715,
  Penguin2 = 724,
  Penguin3 = 731,
  Penguin4 = 743,
  Penguin5 = 752,
  Penguin6 = 766,
  Penguin7 = 771,
  Penguin8 = 781,
  Penguin9 = 791,
  PolarBear1 = 815,
  PolarBear2 = 824,
  PolarBear3 = 833,
  PolarBear4 = 842,
  PolarBear5 = 856,
  PolarBear6 = 861,
  PolarBear7 = 871,
  PolarBear8 = 881,
  PolarBear9 = 891,
  Rabbit1 = 911,
  Rabbit2 = 921,
  Rabbit3 = 931,
  Rabbit4 = 941,
  Rabbit5 = 955,
  Rabbit6 = 964,
  Rabbit7 = 973,
  Rabbit8 = 982,
  Rabbit9 = 996,
  Shark1 = 1011,
  Shark2 = 1021,
  Shark3 = 1031,
  Shark4 = 1045,
  Shark5 = 1054,
  Shark6 = 1063,
  Shark7 = 1072,
  Shark8 = 1086,
  Shark9 = 1091,
  Tiger1 = 1111,
  Tiger2 = 1121,
  Tiger3 = 1135,
  Tiger4 = 1144,
  Tiger5 = 1153,
  Tiger6 = 1162,
  Tiger7 = 1176,
  Tiger8 = 1181,
  Tiger9 = 1191,
  Wolf1 = 1214,
  Wolf2 = 1223,
  Wolf3 = 1232,
  Wolf4 = 1246,
  Wolf5 = 1251,
  Wolf6 = 1261,
  Wolf7 = 1271,
  Wolf8 = 1281,
  Wolf9 = 1295
}

export enum HockeyPlayerCardSpeciesType {
  Beaver = 1,
  Duck,
  Eagle,
  Horse,
  Reindeer,
  Panda,
  Penguin,
  PolarBear,
  Rabbit,
  Shark,
  Tiger,
  Wolf
}

export enum HockeyPlayerCardIconsType {
  None = 1,
  Fist,
  Helmet,
  Puck,
  Rock,
  Skate
}

export const hockeyPlayerCards = getEnumValues(HockeyPlayerCard)

export const hockeyPlayerCardSpeciesTypes = getEnumValues(HockeyPlayerCardSpeciesType)

export const getHockeyPlayerCardSpecie = (cardId: HockeyPlayerCard): HockeyPlayerCardSpeciesType => Math.floor(cardId / 100)

export const getHockeyPlayerCardValue = (cardId: HockeyPlayerCard): number => Math.floor(cardId / 10) % 10

export const getHockeyPlayerCardIcon = (cardId: HockeyPlayerCard): HockeyPlayerCardIconsType => cardId % 10

export const hockeyPlayerCardsBySpecies = hockeyPlayerCardSpeciesTypes.reduce(
  (previousRecord, currentType) => ({ ...previousRecord, [currentType]: hockeyPlayerCards.slice((currentType - 1) * 9, 9 * currentType) }),
  {} as Record<HockeyPlayerCardSpeciesType, HockeyPlayerCard[]>
)

export const selectHockeyPlayerCardsForRandomSpecies = (quantity: number): HockeyPlayerCard[] => {
  return sampleSize(hockeyPlayerCardSpeciesTypes, quantity).flatMap((specie) => hockeyPlayerCardsBySpecies[specie])
}
