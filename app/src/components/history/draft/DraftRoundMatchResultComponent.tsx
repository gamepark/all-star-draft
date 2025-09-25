import { ArenaCard, arenaIrregularAttribute, arenasFanPoints } from '@gamepark/all-star-draft/material/ArenaCard'
import { getBusTokenValue, KnownBusTokenId } from '@gamepark/all-star-draft/material/BusToken'
import { HockeyPlayerCard } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { getTeamStrength } from '@gamepark/all-star-draft/material/TeamStrength'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType, Material, MaterialGame, MaterialMove, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { SupportersIconComponent } from '../../symbols/SupportersIconComponent'
import { TeamStrengthLogComponent } from '../util/TeamStrengthLogComponent'

const COLORS_NEEDING_CONTOUR = [PlayerColor.Green, PlayerColor.Yellow, PlayerColor.Blue]

function getRankFromConsequences(
  moveToArenaLadderForBus: MoveItem<PlayerColor, MaterialType, LocationType> | undefined,
  gameContext: MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >,
  move: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>
): number {
  if (moveToArenaLadderForBus === undefined) {
    const busMoves = gameContext.action.consequences
      .filter(isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken))
      .filter((m) => m.location.type === LocationType.BusTokenSpotBelowBusStationBoard)
    return busMoves.findIndex((m) => m === move) + 1
  } else {
    return moveToArenaLadderForBus.location.id as number
  }
}

export const DraftRoundMatchResultComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({
  move,
  context
}) => {
  const { t } = useTranslation()
  if (
    !isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken)(move) ||
    move.location.type !== LocationType.BusTokenSpotBelowBusStationBoard
  ) {
    return <></>
  }
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const playerNumber = gameContext.game.players.length
  const busItem = new Material<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken, gameContext.game.items[MaterialType.BusToken])
    .index(move.itemIndex)
    .getItem<KnownBusTokenId>()!
  const busId = busItem.id
  const matchNumber = getBusTokenValue(busId.front)
  const busTokenMoveToArenaLadderConsequences = gameContext.action.consequences
    .filter(isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken))
    .filter((move) => move.location.type === LocationType.BusSpotOnArenaCardLadder)
  const moveToArenaLadderForBus = busTokenMoveToArenaLadderConsequences.find((m) => m.itemIndex === move.itemIndex)
  const isTied =
    moveToArenaLadderForBus !== undefined
      ? busTokenMoveToArenaLadderConsequences.some(
          (m) =>
            m.location.id === moveToArenaLadderForBus.location.id &&
            m.location.parent === moveToArenaLadderForBus.location.parent &&
            m.itemIndex !== moveToArenaLadderForBus.itemIndex
        )
      : false
  const rank = getRankFromConsequences(moveToArenaLadderForBus, gameContext, move)
  const teamNumber = busItem.location.id as number
  const team = new Material<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard, gameContext.game.items[MaterialType.HockeyPlayerCard])
    .location(LocationType.PlayerHockeyPlayerTeamSpot)
    .locationId(teamNumber)
    .player(busId.back)
    .getItems<HockeyPlayerCard>()
    .map((item) => item.id)
  const teamStrength = getTeamStrength(team, playerNumber)
  const arenaCardsMaterial = new Material<PlayerColor, MaterialType, LocationType>(
    MaterialType.ArenaCard,
    gameContext.game.items[MaterialType.ArenaCard]
  ).location(LocationType.CurrentArenasRowSpot)
  const arena = (
    moveToArenaLadderForBus !== undefined
      ? arenaCardsMaterial.index(moveToArenaLadderForBus.location.parent)
      : arenaCardsMaterial.location((l) => l.x === matchNumber - 1)
  ).getItem<ArenaCard>()!
  const arenaId = arena.id
  const playerName = usePlayerName(busId.back)
  return (
    <Trans
      i18nKey={isTied ? 'history.draftPhase.matchResultTied' : 'history.draftPhase.matchResult'}
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
