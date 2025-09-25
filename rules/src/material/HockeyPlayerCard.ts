import { getEnumValues } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
import { sampleSize } from 'es-toolkit/compat'
import { Attribute, AttributeKind } from './TeamStrength'

export enum HockeyPlayerCard {
  Rabbit1 = 111,
  Rabbit2 = 121,
  Rabbit3 = 131,
  Rabbit4 = 141,
  Rabbit5 = 156,
  Rabbit6 = 165,
  Rabbit7 = 174,
  Rabbit8 = 183,
  Rabbit9 = 192,

  Duck1 = 212,
  Duck2 = 221,
  Duck3 = 231,
  Duck4 = 241,
  Duck5 = 251,
  Duck6 = 266,
  Duck7 = 275,
  Duck8 = 284,
  Duck9 = 293,

  Beaver1 = 313,
  Beaver2 = 322,
  Beaver3 = 331,
  Beaver4 = 341,
  Beaver5 = 351,
  Beaver6 = 361,
  Beaver7 = 376,
  Beaver8 = 385,
  Beaver9 = 394,

  Eagle1 = 414,
  Eagle2 = 423,
  Eagle3 = 436,
  Eagle4 = 441,
  Eagle5 = 455,
  Eagle6 = 461,
  Eagle7 = 472,
  Eagle8 = 481,
  Eagle9 = 491,

  Penguin1 = 516,
  Penguin2 = 525,
  Penguin3 = 531,
  Penguin4 = 544,
  Penguin5 = 553,
  Penguin6 = 562,
  Penguin7 = 571,
  Penguin8 = 581,
  Penguin9 = 591,

  Panda1 = 614,
  Panda2 = 623,
  Panda3 = 632,
  Panda4 = 641,
  Panda5 = 651,
  Panda6 = 661,
  Panda7 = 671,
  Panda8 = 686,
  Panda9 = 695,

  Wolf1 = 715,
  Wolf2 = 724,
  Wolf3 = 733,
  Wolf4 = 742,
  Wolf5 = 751,
  Wolf6 = 761,
  Wolf7 = 771,
  Wolf8 = 781,
  Wolf9 = 796,

  Shark1 = 811,
  Shark2 = 821,
  Shark3 = 831,
  Shark4 = 846,
  Shark5 = 855,
  Shark6 = 864,
  Shark7 = 873,
  Shark8 = 882,
  Shark9 = 891,

  Tiger1 = 911,
  Tiger2 = 921,
  Tiger3 = 936,
  Tiger4 = 945,
  Tiger5 = 954,
  Tiger6 = 963,
  Tiger7 = 972,
  Tiger8 = 981,
  Tiger9 = 991,

  Horse1 = 1012,
  Horse2 = 1021,
  Horse3 = 1035,
  Horse4 = 1046,
  Horse5 = 1051,
  Horse6 = 1064,
  Horse7 = 1071,
  Horse8 = 1083,
  Horse9 = 1091,

  Reindeer1 = 1111,
  Reindeer2 = 1126,
  Reindeer3 = 1135,
  Reindeer4 = 1144,
  Reindeer5 = 1153,
  Reindeer6 = 1162,
  Reindeer7 = 1171,
  Reindeer8 = 1181,
  Reindeer9 = 1191,

  PolarBear1 = 1216,
  PolarBear2 = 1225,
  PolarBear3 = 1234,
  PolarBear4 = 1243,
  PolarBear5 = 1252,
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
  Glove,
  Helmet,
  Puck,
  Goal
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

export const getSpecieTranslationKey = (specie: HockeyPlayerCardSpeciesType, t: TFunction) => {
  switch (specie) {
    case HockeyPlayerCardSpeciesType.Rabbit:
      return t('specie.rabbit')
    case HockeyPlayerCardSpeciesType.Duck:
      return t('specie.duck')
    case HockeyPlayerCardSpeciesType.Beaver:
      return t('specie.beaver')
    case HockeyPlayerCardSpeciesType.Eagle:
      return t('specie.eagle')
    case HockeyPlayerCardSpeciesType.Penguin:
      return t('specie.penguin')
    case HockeyPlayerCardSpeciesType.Panda:
      return t('specie.panda')
    case HockeyPlayerCardSpeciesType.Wolf:
      return t('specie.wolf')
    case HockeyPlayerCardSpeciesType.Shark:
      return t('specie.shark')
    case HockeyPlayerCardSpeciesType.Tiger:
      return t('specie.tiger')
    case HockeyPlayerCardSpeciesType.Horse:
      return t('specie.horse')
    case HockeyPlayerCardSpeciesType.Reindeer:
      return t('specie.reindeer')
    case HockeyPlayerCardSpeciesType.PolarBear:
      return t('specie.polarBear')
    default:
      throw new Error('Invalid HockeyPlayerCardType')
  }
}

export const getSymbolTranslationKey = (symbol: HockeyPlayerCardSymbolsType, t: TFunction) => {
  switch (symbol) {
    case HockeyPlayerCardSymbolsType.None:
      return t('symbol.none')
    case HockeyPlayerCardSymbolsType.Skate:
      return t('symbol.skate')
    case HockeyPlayerCardSymbolsType.Glove:
      return t('symbol.glove')
    case HockeyPlayerCardSymbolsType.Helmet:
      return t('symbol.helmet')
    case HockeyPlayerCardSymbolsType.Puck:
      return t('symbol.puck')
    case HockeyPlayerCardSymbolsType.Goal:
      return t('symbol.goal')

    default:
      throw new Error('Invalid HockeyPlayerCardType')
  }
}

export const hasAttribute = (cardId: HockeyPlayerCard, attribute: Attribute) => {
  switch (attribute.kind) {
    case AttributeKind.Number:
      return getHockeyPlayerCardValue(cardId) === attribute.value
    case AttributeKind.Species:
      return getHockeyPlayerCardSpecie(cardId) === attribute.value
    case AttributeKind.Symbol:
      return getHockeyPlayerCardSymbol(cardId) === attribute.value
    default:
      throw new Error('Invalid AttributeKind')
  }
}
