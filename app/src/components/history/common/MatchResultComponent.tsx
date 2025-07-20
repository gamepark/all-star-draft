/** @jsxImportSource @emotion/react */
import { ArenaCard, arenaIrregularAttribute, arenasFanPoints } from '@gamepark/all-star-draft/material/ArenaCard'
import { getBusTokenValue, KnownBusTokenId } from '@gamepark/all-star-draft/material/BusToken'
import { isMatchResultCustomMove } from '@gamepark/all-star-draft/material/CustomMoveType'
import { HockeyPlayerCard } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { getTeamStrength } from '@gamepark/all-star-draft/material/TeamStrength'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType, Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { SupportersIconComponent } from '../../symbols/SupportersIconComponent'
import { TeamStrengthLogComponent } from '../util/TeamStrengthLogComponent'

const COLORS_NEEDING_CONTOUR = [PlayerColor.Green, PlayerColor.Yellow, PlayerColor.Blue]

export const MatchResultComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({ move, context }) => {
  const { t } = useTranslation()
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  if (!isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken)(move) || move.location.type !== LocationType.BusSpotOnArenaCardLadder) {
    return <></>
  }
  const matchResultCustomMoves = gameContext.action.consequences.filter(isMatchResultCustomMove)
  const isTied =
    gameContext.action.consequences
      .filter(isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken))
      .filter(
        (m) =>
          m.location.type === LocationType.BusSpotOnArenaCardLadder &&
          m.location.id === move.location.id &&
          m.itemIndex !== move.itemIndex &&
          m.location.parent === move.location.parent
      ).length > 0
  const busId = new Material<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken, gameContext.game.items[MaterialType.BusToken])
    .index(move.itemIndex)
    .getItem<KnownBusTokenId>()!.id
  const matchNumber = getBusTokenValue(busId.front)
  const playerNumber = gameContext.game.players.length
  const matchResult = matchResultCustomMoves[matchNumber - 1].data
  const playerResult = matchResult.find((result) => result.player === busId.back)!
  const rank = move.location.id as number
  const teamNumber = playerResult.teamNumber
  const team = new Material<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard, gameContext.game.items[MaterialType.HockeyPlayerCard])
    .location(LocationType.PlayerHockeyPlayerTeamSpot)
    .locationId(teamNumber)
    .player(busId.back)
    .getItems<HockeyPlayerCard>()
    .map((item) => item.id)
  const teamStrength = getTeamStrength(team, playerNumber)
  const arena = new Material<PlayerColor, MaterialType, LocationType>(MaterialType.ArenaCard, gameContext.game.items[MaterialType.ArenaCard])
    .index(move.location.parent)
    .getItem<ArenaCard>()!
  const arenaId = arena.id
  const playerName = usePlayerName(busId.back)
  return (
    <Trans
      defaults={isTied ? 'history.draftPhase.matchResultTied' : 'history.draftPhase.matchResult'}
      values={{
        name: playerName,
        rank: rank,
        teamNumber: teamNumber,
        arena: t(`arena.${ArenaCard[arenaId]}`),
        arenaNumber: matchNumber,
        fanPoints: arenasFanPoints[arenaId][rank - 1]
      }}
      components={{
        sup: <sup></sup>,
        strength: (
          <TeamStrengthLogComponent
            teamStrength={teamStrength}
            playerNumber={playerNumber}
            arenaIrregularRule={arenaId in arenaIrregularAttribute ? arenaIrregularAttribute[arenaId] : undefined}
          />
        ),
        supporterIcon: <SupportersIconComponent contour={COLORS_NEEDING_CONTOUR.includes(busId.back)} />
      }}
    />
  )
}
