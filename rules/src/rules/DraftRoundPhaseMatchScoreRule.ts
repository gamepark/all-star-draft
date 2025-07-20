import { MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { ArenaCard, arenaIrregularAttribute } from '../material/ArenaCard'
import { getBusTokenValue, KnownBusTokenId } from '../material/BusToken'
import { CustomMoveType, MatchResultDataType } from '../material/CustomMoveType'
import { HockeyPlayerCard } from '../material/HockeyPlayerCard'
import { LocationType } from '../material/LocationType'
import { getPlayersNewFans, MatchState } from '../material/MatchRanking'
import { MaterialRotation } from '../material/MaterialRotation'
import { MaterialType } from '../material/MaterialType'
import { getTeamStrength } from '../material/TeamStrength'
import { Memorize } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class DraftRoundPhaseMatchScoreRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId> {
  onRuleStart(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const roundNumber = this.material(MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot).length
    const playerCount = this.game.players.length
    const arenaIndex = getBusTokenValue(
      this.material(MaterialType.BusToken)
        .location(LocationType.PlayerBusTokenTeamSpot)
        .minBy((item) => getBusTokenValue((item.id as KnownBusTokenId).front))
        .getItem<KnownBusTokenId>()!.id.front
    )
    const currentArenaMaterial = this.material(MaterialType.ArenaCard)
      .location(LocationType.CurrentArenasRowSpot)
      .location((l) => l.x === arenaIndex - 1)
    const currentArena = currentArenaMaterial.getItem<ArenaCard>()!
    const currentArenaIrregularAttribute = arenaIrregularAttribute[currentArena.id]
    const playerTeamsNumbers = this.game.players.reduce(
      (accumulator, player) => {
        const busToken = this.material(MaterialType.BusToken)
          .location(LocationType.PlayerBusTokenTeamSpot)
          .player(player)
          .id<KnownBusTokenId>((id) => getBusTokenValue(id.front) === arenaIndex)
          .getItem<KnownBusTokenId>()!
        return { ...accumulator, [player]: busToken.location.id as number }
      },
      {} as Record<PlayerColor, number>
    )
    const currentTeams = this.game.players.map((player) => {
      const busToken = this.material(MaterialType.BusToken)
        .location(LocationType.PlayerBusTokenTeamSpot)
        .player(player)
        .id<KnownBusTokenId>((id) => getBusTokenValue(id.front) === arenaIndex)
        .getItem<KnownBusTokenId>()!
      const teamCardIds = this.material(MaterialType.HockeyPlayerCard)
        .location(LocationType.PlayerHockeyPlayerTeamSpot)
        .locationId(busToken.location.id)
        .player(player)
        .getItems<HockeyPlayerCard>()
        .map((item) => item.id)
      return {
        player: player,
        team: teamCardIds
      }
    })
    const match: MatchState = {
      arena: currentArena.id,
      teams: currentTeams
    }
    const ranking = getPlayersNewFans(match)
    const sortedRanking = ranking.sort((a, b) => a.rank - b.rank)
    const moves: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] = sortedRanking
      .map(({ player, fans: fanPoints }) => {
        const playerTeamStrength = getTeamStrength(currentTeams.find((playerTeam) => playerTeam.player === player)!.team, playerCount)
        this.memorize<number>(Memorize.Score, (value) => value + fanPoints, player)
        const playerBusTokenMaterial = this.material(MaterialType.BusToken)
          .location(LocationType.PlayerBusTokenTeamSpot)
          .locationId(playerTeamsNumbers[player])
          .player(player)
        return playerBusTokenMaterial.moveItem({
          type: LocationType.BusTokenSpotBelowBusStationBoard,
          x:
            currentArenaIrregularAttribute !== undefined && playerTeamStrength.irregularsAttributes?.includes(currentArenaIrregularAttribute)
              ? 5
              : playerTeamStrength.strength - 1
        })
      })
      .concat(
        sortedRanking.map(({ player, rank }) => {
          const playerBusTokenMaterial = this.material(MaterialType.BusToken)
            .location(LocationType.PlayerBusTokenTeamSpot)
            .locationId(playerTeamsNumbers[player])
            .player(player)
          return playerBusTokenMaterial.moveItem({
            type: LocationType.BusSpotOnArenaCardLadder,
            parent: currentArenaMaterial.getIndex(),
            id: rank
          })
        })
      )
      .concat(
        sortedRanking.map(({ player }) => {
          const playerBusTokenMaterial = this.material(MaterialType.BusToken)
            .location(LocationType.PlayerBusTokenTeamSpot)
            .locationId(playerTeamsNumbers[player])
            .player(player)
          return playerBusTokenMaterial.moveItem({
            type: LocationType.PlayerBusTokenReserveSpot,
            player: player,
            rotation: MaterialRotation.FaceDown
          })
        })
      )
    moves.push(
      this.customMove<CustomMoveType>(
        CustomMoveType.MatchResult,
        this.game.players.map((player) => {
          const teamNumber = playerTeamsNumbers[player]
          const playerRank = ranking.find((playerRank) => playerRank.player === player)!
          return { player: player, teamNumber: teamNumber, rank: playerRank.rank }
        }) as MatchResultDataType
      )
    )
    const isLastMatchForRound = roundNumber === arenaIndex
    if (isLastMatchForRound) {
      moves.push(
        ...this.game.players.map((player) => this.material(MaterialType.BusToken).player(player).shuffle()),
        this.startSimultaneousRule(roundNumber === 3 ? RuleId.PlayoffRoundSetupPhase : RuleId.DraftRoundSetupDrawCards)
      )
    } else {
      moves.push(this.startSimultaneousRule(RuleId.DraftRoundPhaseMatchScore))
    }
    return moves
  }

  public getActivePlayerLegalMoves(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }
}
