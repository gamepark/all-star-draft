/** @jsxImportSource @emotion/react */
import { HockeyPlayerCard } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType, MaterialGame, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { CardValueLogComponent } from './CardValueLogComponent'

export const TeamMemberSentToBenchComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({
  move,
  context
}) => {
  if (
    !isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) ||
    move.location.type !== LocationType.PlayerHockeyPlayerHandSpot
  ) {
    return <></>
  }
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const hockeyCardItem = gameContext.game.items[MaterialType.HockeyPlayerCard]![move.itemIndex] as MaterialItem<PlayerColor, LocationType, HockeyPlayerCard>
  const hockeyCard = hockeyCardItem.id
  const playerName = usePlayerName(move.location.player)
  const teamNumber = hockeyCardItem.location.id
  return (
    <Trans
      defaults="history.draftPhase.teamBackToBench"
      values={{ name: playerName, teamNumber: teamNumber }}
      components={{ sup: <sup></sup>, card: <CardValueLogComponent cardId={hockeyCard} /> }}
    />
  )
}
