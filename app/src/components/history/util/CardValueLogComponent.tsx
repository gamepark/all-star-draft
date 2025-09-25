import {
  getHockeyPlayerCardSpecie,
  getHockeyPlayerCardSymbol,
  getHockeyPlayerCardValue,
  HockeyPlayerCard,
  HockeyPlayerCardSymbolsType
} from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { Picture } from '@gamepark/react-game'
import { FC } from 'react'
import { hockeyPlayerCardDescription } from '../../../material/HockeyPlayerCardDescription'
import { getSpeciesValueComponent, getSymbolValueComponent } from '../../util/valueComponents'

type CardValueLogComponentProps = {
  cardId?: HockeyPlayerCard
}

export const CardValueLogComponent: FC<CardValueLogComponentProps> = ({ cardId }) => {
  if (cardId === undefined) {
    return <Picture src={hockeyPlayerCardDescription.backImage} style={{ borderRadius: 5, height: '3em' }} />
  }
  const species = getHockeyPlayerCardSpecie(cardId)
  const symbol = getHockeyPlayerCardSymbol(cardId)
  const value = getHockeyPlayerCardValue(cardId)
  return (
    <>
      {getSpeciesValueComponent(species)}
      {value}
      {symbol !== HockeyPlayerCardSymbolsType.None && getSymbolValueComponent(symbol)}
    </>
  )
}
