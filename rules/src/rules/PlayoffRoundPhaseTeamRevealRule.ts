import { MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialRotation } from '../material/MaterialRotation'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class PlayoffRoundPhaseTeamRevealRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId> {
  onRuleStart(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
    moves.push(
      ...this.activePlayers.flatMap((player) => [
        this.material(MaterialType.HockeyPlayerCard)
          .location(LocationType.PlayerHockeyPlayerTeamSpot)
          .player(player)
          .locationId(2)
          .rotation(MaterialRotation.FaceDown)
          .moveItemsAtOnce({ type: LocationType.PlayerHockeyPlayerTeamSpot, id: 2, player: player, rotation: MaterialRotation.FaceUp })
      ])
    )
    moves.push(this.startSimultaneousRule(RuleId.PlayoffRoundPhaseMainMatch, this.activePlayers))
    return moves
  }

  getActivePlayerLegalMoves(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }
}
