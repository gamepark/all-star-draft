import { Material, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { ArenaCard, arenaIrregularAttribute } from '../material/ArenaCard'
import { getBusTokenValue, KnownBusTokenId } from '../material/BusToken'
import { HockeyPlayerCard } from '../material/HockeyPlayerCard'
import { LocationType } from '../material/LocationType'
import { getPlayersNewFans, MatchState } from '../material/MatchRanking'
import { MaterialRotation } from '../material/MaterialRotation'
import { MaterialType } from '../material/MaterialType'
import { getTeamStrength, IrregularAttribute } from '../material/TeamStrength'
import { Memory } from '../Memory'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class DraftRoundPhaseMatchScoreRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId> {
  onRuleStart(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const playerCount = this.game.players.length
    const currentArenasMaterial = this.material(MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot)
    const roundNumber = currentArenasMaterial.length
    const busTokenPlayerTeamMaterial = this.material(MaterialType.BusToken).location(LocationType.PlayerBusTokenTeamSpot)
    const arenaIndex = getBusTokenValue(
      busTokenPlayerTeamMaterial.minBy((item) => getBusTokenValue((item.id as KnownBusTokenId).front)).getItem<KnownBusTokenId>()!.id.front
    )
    const currentArenaMaterial = currentArenasMaterial.location((l) => l.x === arenaIndex - 1)
    const currentArena = currentArenaMaterial.getItem<ArenaCard>()!
    const currentArenaIrregularAttribute = arenaIrregularAttribute[currentArena.id]
    const playerTeamsNumbers = this.game.players.reduce(
      (accumulator, player) => {
        const busToken = busTokenPlayerTeamMaterial
          .player(player)
          .id<KnownBusTokenId>((id) => getBusTokenValue(id.front) === arenaIndex)
          .getItem<KnownBusTokenId>()!
        return { ...accumulator, [player]: busToken.location.id as number }
      },
      {} as Record<PlayerColor, number>
    )
    const currentTeams = this.game.players.map((player) => {
      const busToken = busTokenPlayerTeamMaterial
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
    const moves = this.buildMovesToBusStationCard(
      sortedRanking,
      currentTeams,
      playerCount,
      playerTeamsNumbers,
      busTokenPlayerTeamMaterial,
      currentArenaIrregularAttribute
    )
      .concat(this.buildBusMovesToArenaLadder(sortedRanking, playerTeamsNumbers, currentArenaMaterial, busTokenPlayerTeamMaterial))
      .concat(this.buildBusMovesToPlayerReserves(sortedRanking, playerTeamsNumbers, busTokenPlayerTeamMaterial))
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

  private buildBusMovesToPlayerReserves(
    sortedRanking: { player: PlayerColor; fans: number; rank: number }[],
    playerTeamsNumbers: Record<PlayerColor, number>,
    busTokenPlayerTeamMaterial: Material<PlayerColor, MaterialType, LocationType>
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return sortedRanking.map(({ player }) => {
      const playerBusTokenMaterial = busTokenPlayerTeamMaterial.locationId(playerTeamsNumbers[player]).player(player)
      return playerBusTokenMaterial.moveItem({
        type: LocationType.PlayerBusTokenReserveSpot,
        player: player,
        rotation: MaterialRotation.FaceDown
      })
    })
  }

  private buildBusMovesToArenaLadder(
    sortedRanking: { player: PlayerColor; fans: number; rank: number }[],
    playerTeamsNumbers: Record<PlayerColor, number>,
    currentArenaMaterial: Material<PlayerColor, MaterialType, LocationType>,
    busTokenPlayerTeamMaterial: Material<PlayerColor, MaterialType, LocationType>
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return sortedRanking.map(({ player, rank }) => {
      const playerBusTokenMaterial = busTokenPlayerTeamMaterial.locationId(playerTeamsNumbers[player]).player(player)
      return playerBusTokenMaterial.moveItem({
        type: LocationType.BusSpotOnArenaCardLadder,
        parent: currentArenaMaterial.getIndex(),
        id: rank
      })
    })
  }

  private buildMovesToBusStationCard(
    sortedRanking: { player: PlayerColor; fans: number; rank: number }[],
    currentTeams: {
      player: PlayerColor
      team: HockeyPlayerCard[]
    }[],
    playerCount: number,
    playerTeamsNumbers: Record<PlayerColor, number>,
    busTokenPlayerTeamMaterial: Material<PlayerColor, MaterialType, LocationType>,
    currentArenaIrregularAttribute: IrregularAttribute | undefined
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return sortedRanking.map(({ player, fans: fanPoints }) => {
      const playerTeamStrength = getTeamStrength(currentTeams.find((playerTeam) => playerTeam.player === player)!.team, playerCount)
      this.memorize<number>(Memory.Score, (value) => value + fanPoints, player)
      const playerBusTokenMaterial = busTokenPlayerTeamMaterial.locationId(playerTeamsNumbers[player]).player(player)
      return playerBusTokenMaterial.moveItem({
        type: LocationType.BusTokenSpotBelowBusStationBoard,
        x:
          currentArenaIrregularAttribute !== undefined && playerTeamStrength.irregularsAttributes?.includes(currentArenaIrregularAttribute)
            ? 5
            : playerTeamStrength.strength - 1
      })
    })
  }
}
