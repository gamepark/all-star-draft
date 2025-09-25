import { HockeyPlayerCard } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { CardValueLogComponent } from '../util/CardValueLogComponent'

export const TeamMemberAddedFromBench: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({ move, context }) => {
  if (
    !isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) ||
    move.location.type !== LocationType.PlayerHockeyPlayerTeamSpot
  ) {
    return <></>
  }
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const card = gameContext.game.items[MaterialType.HockeyPlayerCard]![move.itemIndex]
  const cardId = card.id === undefined ? undefined : (card.id as HockeyPlayerCard)
  const teamNumber = move.location.id as number
  const playerName = usePlayerName(move.location.player)
  return (
    <Trans
      i18nKey={
        gameContext.game.rule?.id === RuleId.PlayoffSubstitutePlayers ? 'history.playOffsPhase.addToTeamFromBench' : 'history.draftPhase.addToTeamFromBench'
      }
      values={{ name: playerName, teamNumber: teamNumber }}
      components={{
        sup: <sup></sup>,
        card: <CardValueLogComponent cardId={cardId} />
      }}
    />
  )
}
