import {
  getHockeyPlayerCardSpecie,
  getHockeyPlayerCardSymbol,
  getHockeyPlayerCardValue,
  HockeyPlayerCard,
  HockeyPlayerCardSymbolsType
} from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps, Picture, usePlayerName } from '@gamepark/react-game'
import { Material, MaterialGame, MaterialMove, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { hockeyPlayerCardDescription } from '../../material/HockeyPlayerCardDescription'
import { getSpeciesValueComponent, getSymbolValueComponent } from '../help/util/valueComponents'

export const CardDraftedComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({ move, context }) => {
  const cardMove = move as MoveItem<PlayerColor, MaterialType, LocationType>
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const draftedCard = new Material(MaterialType.HockeyPlayerCard, gameContext.game.items[MaterialType.HockeyPlayerCard])
    .index(cardMove.itemIndex)
    .getItem<HockeyPlayerCard>()
  const logComponent = draftedCard?.id ? (
    getSpeciesValueComponent(getHockeyPlayerCardSpecie(draftedCard.id))!
  ) : (
    <Picture src={hockeyPlayerCardDescription.backImage} height={75} style={{ borderRadius: 5 }} />
  )
  const cardValue = draftedCard?.id ? getHockeyPlayerCardValue(draftedCard.id) : ''
  const gearComponent =
    draftedCard?.id && getHockeyPlayerCardSymbol(draftedCard.id) !== HockeyPlayerCardSymbolsType.None ? (
      getSymbolValueComponent(getHockeyPlayerCardSymbol(draftedCard.id))!
    ) : (
      <></>
    )
  const playerName = usePlayerName(cardMove.location.player)
  return (
    <Trans defaults="log.draftPhase.cardDrafted" values={{ name: playerName, cardValue: cardValue }} components={{ card: logComponent, gear: gearComponent }} />
  )
}
