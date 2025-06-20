import {
  getHockeyPlayerCardSpecie,
  getHockeyPlayerCardSymbol,
  getHockeyPlayerCardValue,
  getSpecieTranslationKey,
  getSymbolTranslationKey,
  HockeyPlayerCard
} from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const HockeyPlayerCardHelp: FC<MaterialHelpProps<number, MaterialType, LocationType>> = ({ item }) => {
  const { t } = useTranslation()
  if (item.id !== undefined) {
    const hockeyPlayerId = item.id as HockeyPlayerCard
    const translatedSpecie = getSpecieTranslationKey(getHockeyPlayerCardSpecie(hockeyPlayerId), t)
    const cardValue = getHockeyPlayerCardValue(hockeyPlayerId)
    const translatedSymbol = getSymbolTranslationKey(getHockeyPlayerCardSymbol(hockeyPlayerId), t)
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
