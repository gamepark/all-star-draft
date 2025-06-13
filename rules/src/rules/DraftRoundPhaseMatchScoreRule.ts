import { MaterialMove, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { BusTokenId, busTokenValue, KnownBusTokenId } from '../material/BusToken'
import { getPlayersNewFans, MatchState } from '../material/MatchRanking'
import { HockeyPlayerCard } from '../material/HockeyPlayerCard'
import { RuleId } from './RuleId'
import { Memorize } from '../Memorize'
import { MaterialRotation } from '../material/MaterialRotation'

export class DraftRoundPhaseMatchScoreRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  onRuleStart(_move: RuleMove<PlayerColor>, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const arenaIndex = busTokenValue(
      this.material(MaterialType.BusToken).location(LocationType.BusTokenSpotBelowBusStationBoard).getItem<KnownBusTokenId>()!.id.front
    )
    const currentArena = this.material(MaterialType.ArenaCard)
      .location((location) => location.x === arenaIndex - 1 && location.type === LocationType.CurrentArenasRowSpot)
      .getItem()
    const currentTeams: {
      player: PlayerColor
      team: HockeyPlayerCard[]
    }[] = this.game.players.map((player) => ({ player: player, team: this.remind(Memorize.TeamLineup, player) }))
    const match: MatchState = {
      arena: currentArena?.id,
      teams: currentTeams
    }
    const ranking = getPlayersNewFans(match)
    this.game.players.forEach((player) => this.memorize<number>(Memorize.Score, (score) => score + (ranking[player] ?? 0), player))
    const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = this.material(MaterialType.BusToken)
      .location(LocationType.BusTokenSpotBelowBusStationBoard)
      .moveItems((item) => ({ type: LocationType.PlayerBusTokenReserveSpot, player: (item.id as BusTokenId).back, rotation: MaterialRotation.FaceDown }))
    if (this.material(MaterialType.BusToken).location(LocationType.PlayerBusTokenTeamSpot).getItems().length > 0)
      moves.push(this.startSimultaneousRule(RuleId.DraftRoundPhaseMatchMoveToStadium))
    else moves.push(this.startSimultaneousRule(RuleId.DraftRoundSetupDrawCards))
    return moves
  }
}
