import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { BusTokenId, busTokenValue, KnownBusTokenId } from '../material/BusToken'
import { HockeyPlayerCard } from '../material/HockeyPlayerCard'
import { LocationType } from '../material/LocationType'
import { getPlayersNewFans, MatchState } from '../material/MatchRanking'
import { MaterialRotation } from '../material/MaterialRotation'
import { MaterialType } from '../material/MaterialType'
import { Memorize } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class DraftRoundPhaseMatchScoreRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  onRuleStart(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const arenaIndex = busTokenValue(
      this.material(MaterialType.BusToken).location(LocationType.BusTokenSpotBelowBusStationBoard).getItem<KnownBusTokenId>()!.id.front
    )
    const currentArenaMaterial = this.material(MaterialType.ArenaCard).location(
      (location) => location.x === arenaIndex - 1 && location.type === LocationType.CurrentArenasRowSpot
    )
    const currentArena = currentArenaMaterial.getItem()
    const currentTeams: {
      player: PlayerColor
      team: HockeyPlayerCard[]
    }[] = this.game.players.map((player) => ({ player: player, team: this.remind(Memorize.TeamLineup, player) }))
    const match: MatchState = {
      arena: currentArena?.id,
      teams: currentTeams
    }
    const ranking = getPlayersNewFans(match)
    this.game.players.forEach((player) =>
      this.memorize<number>(Memorize.Score, (score) => score + (ranking.find((rank) => rank.player === player)?.fans ?? 0), player)
    )
    const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = ranking
      .sort((a, b) => a.rank - b.rank)
      .map((rank) => {
        const playerBus = this.material(MaterialType.BusToken).location(LocationType.BusTokenSpotBelowBusStationBoard)
        return playerBus
          .id<BusTokenId>((id) => id.back === rank.player)
          .moveItem({
            type: LocationType.BusSpotOnArenaCardLadder,
            id: rank.rank,
            parent: currentArenaMaterial.getIndex()
          })
      })
    moves.push(
      ...this.material(MaterialType.BusToken)
        .location(LocationType.BusTokenSpotBelowBusStationBoard)
        .moveItems((item) => ({ type: LocationType.PlayerBusTokenReserveSpot, player: (item.id as BusTokenId).back, rotation: MaterialRotation.FaceDown }))
    )
    const isLastBusToken = this.material(MaterialType.BusToken).location(LocationType.PlayerBusTokenTeamSpot).getItems().length === 0
    if (isLastBusToken) {
      moves.push(...this.game.players.map((player) => this.material(MaterialType.BusToken).player(player).shuffle()))
    }
    moves.push(this.startSimultaneousRule(isLastBusToken ? RuleId.DraftRoundSetupDrawCards : RuleId.DraftRoundPhaseMatchMoveToStadium))
    return moves
  }
}
