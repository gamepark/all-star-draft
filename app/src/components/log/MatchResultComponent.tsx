/** @jsxImportSource @emotion/react */
import { ArenaCard, arenaIrregularAttribute, arenasFanPoints } from '@gamepark/all-star-draft/material/ArenaCard'
import { KnownBusTokenId } from '@gamepark/all-star-draft/material/BusToken'
import { HockeyPlayerCard } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { getTeamStrength } from '@gamepark/all-star-draft/material/TeamStrength'
import { Memorize } from '@gamepark/all-star-draft/Memorize'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType, Material, MaterialGame, MaterialMove, PlayerMemory } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { SupportersIconComponent } from '../symbols/SupportersIconComponent'
import { TeamStrengthLogComponent } from './TeamStrengthLogComponent'

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
  const playerNumber: number = gameContext.game.players.length
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
  const rank = move.location.id as number
  const team = new PlayerMemory(gameContext.game, busId.back).remind<HockeyPlayerCard[]>(Memorize.TeamLineup)
  const teamStrength = getTeamStrength(team, playerNumber)
  const teamNumber = new Material<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard, gameContext.game.items[MaterialType.HockeyPlayerCard])
    .id<HockeyPlayerCard>(team[0])
    .getItem<HockeyPlayerCard>()!.location.id
  const arena = new Material<PlayerColor, MaterialType, LocationType>(MaterialType.ArenaCard, gameContext.game.items[MaterialType.ArenaCard])
    .index(move.location.parent)
    .getItem<ArenaCard>()!
  const arenaId = arena.id
  const arenaNumber = arena.location.x! + 1
  const playerName = usePlayerName(busId.back)
  return (
    <Trans
      defaults={isTied ? 'history.draftPhase.matchResultTied' : 'history.draftPhase.matchResult'}
      values={{
        name: playerName,
        rank: rank,
        teamNumber: teamNumber,
        arena: t(`arena.${ArenaCard[arenaId]}`),
        arenaNumber: arenaNumber,
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
        supporterIcon: <SupportersIconComponent />
      }}
    />
  )
}
