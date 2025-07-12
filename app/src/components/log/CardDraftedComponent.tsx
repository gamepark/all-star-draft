/** @jsxImportSource @emotion/react */
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
import { isMoveItemType, Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { hockeyPlayerCardDescription } from '../../material/HockeyPlayerCardDescription'
import { getSpeciesValueComponent, getSymbolValueComponent } from '../util/valueComponents'

export const CardDraftedComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({ move, context }) => {
  if (!isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)) {
    return <></>
  }
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const draftedCard = new Material(MaterialType.HockeyPlayerCard, gameContext.game.items[MaterialType.HockeyPlayerCard])
    .index(move.itemIndex)
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
  const playerName = usePlayerName(move.location.player)
  return (
    <Trans
      defaults="history.draftPhase.cardDrafted"
      values={{ name: playerName, cardValue: cardValue }}
      components={{ card: logComponent, gear: gearComponent }}
    />
  )
}
