/** @jsxImportSource @emotion/react */
import { HockeyPlayerCard } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { getTeamStrength } from '@gamepark/all-star-draft/material/TeamStrength'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { isMoveItemTypeAtOnce, Material, MaterialGame, MaterialMove, MoveItemsAtOnce } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { TeamStrengthLogComponent } from './TeamStrengthLogComponent'

const getTeam = (
  move: MoveItemsAtOnce<PlayerColor, MaterialType, LocationType>,
  gameContext: MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
) => {
  const hockeyCardsMaterial = new Material<PlayerColor, MaterialType, LocationType>(
    MaterialType.HockeyPlayerCard,
    gameContext.game.items[MaterialType.HockeyPlayerCard]
  )
  if (move.indexes.length === 5) {
    return move.reveal === undefined
      ? hockeyCardsMaterial
          .index((index) => move.indexes.includes(index))
          .getItems<HockeyPlayerCard>()
          .map((card) => card.id)
      : Object.values(move.reveal).map((value) => value.id as HockeyPlayerCard)
  } else if (move.indexes.length === 1) {
    const playerCards = hockeyCardsMaterial
      .location(LocationType.PlayerHockeyPlayerTeamSpot)
      .player(move.location.player)
      .locationId(move.location.id)
      .getItems<HockeyPlayerCard | undefined>()
      .filter((card) => card.id !== undefined)
      .map((card) => card.id!)
    return move.reveal === undefined ? playerCards : playerCards.concat(move.reveal[move.indexes[0]].id as HockeyPlayerCard)
  }
  return []
}

export const TeamRevealComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({ move, context }) => {
  if (!isMoveItemTypeAtOnce<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)) {
    return <></>
  }
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const team = getTeam(move, gameContext)
  const playerNumber = gameContext.game.players.length
  const teamStrength = getTeamStrength(team, playerNumber)
  const playerName = usePlayerName(move.location.player)
  return (
    <Trans
      defaults="history.draftPhase.revealTeam"
      values={{ name: playerName, teamNumber: move.location.id }}
      components={{ sup: <sup></sup>, strength: <TeamStrengthLogComponent teamStrength={teamStrength} playerNumber={playerNumber} /> }}
    />
  )
}
