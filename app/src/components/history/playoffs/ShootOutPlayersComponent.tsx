/** @jsxImportSource @emotion/react */
import { HockeyPlayerCard } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { getTeamStrength } from '@gamepark/all-star-draft/material/TeamStrength'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { isStartSimultaneousRule, Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { TeamStrengthLogComponent } from '../util/TeamStrengthLogComponent'

export const ShootOutPlayersComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({ move, context }) => {
  if (!isStartSimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId>(move) || move.id !== RuleId.PlayoffRoundPhaseTieMatch) {
    return <></>
  }
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const playersCount: number = gameContext.game.players.length
  const playerNames = gameContext.game.rule!.players!.map((player) => usePlayerName(player)).join(', ')
  const team = new Material<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard, gameContext.game.items[MaterialType.HockeyPlayerCard])
    .player(gameContext.game.rule!.players![0])
    .location(LocationType.PlayerHockeyPlayerTeamSpot)
    .locationId(2)
    .getItems<HockeyPlayerCard>()
    .map((card) => card.id)
  const teamStrength = getTeamStrength(team, playersCount)
  return (
    <Trans
      defaults="history.playOffsPhase.shootOutStart"
      values={{ playerCount: gameContext.game.rule!.players!.length, names: playerNames }}
      components={{ strength: <TeamStrengthLogComponent teamStrength={teamStrength} playerNumber={playersCount} /> }}
    />
  )
}
