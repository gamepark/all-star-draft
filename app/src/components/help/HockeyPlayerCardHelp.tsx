import {
  getHockeyPlayerCardSpecie,
  getHockeyPlayerCardSymbol,
  getHockeyPlayerCardValue,
  HockeyPlayerCard,
  HockeyPlayerCardSpeciesType,
  HockeyPlayerCardSymbolsType
} from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { MaterialHelpProps } from '@gamepark/react-game'
import { TFunction } from 'i18next'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const HockeyPlayerCardHelp: FC<MaterialHelpProps<number, MaterialType, LocationType>> = ({ item }) => {
  const { t } = useTranslation()
  if (item.id !== undefined) {
    const hockeyPlayerId = item.id as HockeyPlayerCard
    const translatedSpecie = getSpecieTranslationKey(hockeyPlayerId, t)
    const cardValue = getHockeyPlayerCardValue(hockeyPlayerId)
    const translatedSymbol = getSymbolTranslationKey(hockeyPlayerId, t)
    return (
      <>
        <h2>{t('help.hockeyPlayerCard.title')}</h2>
        <p>
          <span style={{ fontWeight: 'bold' }}>{t('help.hockeyPlayerCard.specie')}</span>
          {' ' + translatedSpecie}
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>{t('help.hockeyPlayerCard.number')}</span>
          {' ' + cardValue.toString()}
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>{t('help.hockeyPlayerCard.symbol')}</span>
          {' ' + translatedSymbol}
        </p>
      </>
    )
  }
  return <></>
}

const getSpecieTranslationKey = (itemId: HockeyPlayerCard, t: TFunction) => {
  switch (getHockeyPlayerCardSpecie(itemId)) {
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

const getSymbolTranslationKey = (itemId: HockeyPlayerCard, t: TFunction) => {
  switch (getHockeyPlayerCardSymbol(itemId)) {
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
