/** @jsxImportSource @emotion/react */
import { HockeyPlayerCard } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { isDeleteItemType, MaterialGame, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { CardValueLogComponent } from '../util/CardValueLogComponent'

export const TeamMemberRemovedComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({ move, context }) => {
  if (!isDeleteItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)) {
    return <></>
  }
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const card = gameContext.game.items[MaterialType.HockeyPlayerCard]![move.itemIndex] as MaterialItem<PlayerColor, LocationType, HockeyPlayerCard>
  const cardId = card.id
  const playerName = usePlayerName(card.location.player)
  return (
    <Trans defaults="history.playOffsPhase.removeFromTeam" values={{ name: playerName }} components={{ card: <CardValueLogComponent cardId={cardId} /> }} />
  )
}
