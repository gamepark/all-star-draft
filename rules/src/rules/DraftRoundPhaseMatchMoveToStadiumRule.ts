import { MaterialMove, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { busTokenValue, KnownBusTokenId } from '../material/BusToken'
import { HockeyPlayerCard } from '../material/HockeyPlayerCard'
import { Memorize } from '../Memorize'
import { getTeamStrength } from '../material/TeamStrength'
import { RuleId } from './RuleId'
import { ArenaCard, arenaIrregularAttribute } from '../material/ArenaCard'

export class DraftRoundPhaseMatchMoveToStadiumRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  onRuleStart(_move: RuleMove<PlayerColor>, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const playerCount = this.game.players.length
    const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = this.game.players.flatMap((player) => {
      const arenaIndex = busTokenValue(
        this.material(MaterialType.BusToken)
          .location(LocationType.PlayerBusTokenTeamSpot)
          .player(player)
          .minBy((item) => (item.id as KnownBusTokenId).front)
          .getItem<KnownBusTokenId>()!.id.front
      )
      const busToken = this.material(MaterialType.BusToken)
        .location(LocationType.PlayerBusTokenTeamSpot)
        .player(player)
        .id<KnownBusTokenId>((busId) => busTokenValue(busId.front) === arenaIndex)
      const teamIndex = busToken.getItem()?.location.id as number
      const teamLineup = this.material(MaterialType.HockeyPlayerCard)
        .location(LocationType.PlayerHockeyPlayerTeamSpot)
        .player(player)
        .locationId(teamIndex)
        .getItems()
        .map((hockeyPlayer) => hockeyPlayer.id as HockeyPlayerCard)
      this.memorize(Memorize.TeamLineup, teamLineup, player)
      const irregularAttribute =
        arenaIrregularAttribute[
          this.material(MaterialType.ArenaCard)
            .location((location) => location.type === LocationType.CurrentArenasRowSpot && location.x === arenaIndex - 1)
            .getItem<ArenaCard>()!.id
        ]
      const teamStrength = getTeamStrength(teamLineup, playerCount)
      const teamHasNeededIrregularAttribute = irregularAttribute !== undefined && (teamStrength.irregularsAttributes ?? []).includes(irregularAttribute)
      return busToken.moveItem({ type: LocationType.BusTokenSpotBelowBusStationBoard, x: teamHasNeededIrregularAttribute ? 5 : teamStrength.strength - 1 })
    })
    moves.push(this.startSimultaneousRule(RuleId.DraftRoundPhaseMatchScore))
    return moves
  }
}
