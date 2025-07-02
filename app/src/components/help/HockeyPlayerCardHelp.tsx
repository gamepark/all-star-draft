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
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />
}

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
          <Trans defaults={'help.hockeyPlayerCard.specie'} components={components} values={{ specie: translatedSpecie }} />
        </p>
        <p>
          <Trans defaults={'help.hockeyPlayerCard.number'} components={components} values={{ number: cardValue.toString() }} />
        </p>
        <p>
          <Trans defaults={'help.hockeyPlayerCard.symbol'} components={components} values={{ symbol: translatedSymbol }} />
        </p>
      </>
    )
  }
  return <></>
}
