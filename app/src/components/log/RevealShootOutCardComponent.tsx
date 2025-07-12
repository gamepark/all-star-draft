/** @jsxImportSource @emotion/react */
import { HockeyPlayerCard } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { getTeamStrength } from '@gamepark/all-star-draft/material/TeamStrength'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { isMoveItemTypeAtOnce, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { CardValueLogComponent } from './CardValueLogComponent'
import { TeamStrengthLogComponent } from './TeamStrengthLogComponent'

export const RevealShootOutCardComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({ move, context }) => {
  if (
    !isMoveItemTypeAtOnce<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) ||
    move.location.type !== LocationType.PlayerHockeyPlayerTeamSpot ||
    move.location.id !== 3
  ) {
    return <></>
  }
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const playerNumber = gameContext.game.players.length
  const card =
    move.reveal !== undefined
      ? (move.reveal[move.indexes[0]].id as HockeyPlayerCard)
      : (gameContext.game.items[MaterialType.HockeyPlayerCard]![move.indexes[0]].id as HockeyPlayerCard)
  const teamStrength = getTeamStrength([card], playerNumber)
  const playerName = usePlayerName(move.location.player)
  return (
    <Trans
      defaults="history.playOffsPhase.revealShootOutCard"
      values={{ name: playerName }}
      components={{
        card: <CardValueLogComponent cardId={card} />,
        strength: <TeamStrengthLogComponent teamStrength={teamStrength} playerNumber={playerNumber} />
      }}
    />
  )
}
