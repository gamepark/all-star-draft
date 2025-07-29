import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialRotation } from '../material/MaterialRotation'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class DraftRoundPhaseTeamRevealRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId> {
  onRuleStart(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const roundNumber = this.material(MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot).length
    const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
    moves.push(this.material(MaterialType.BusToken).location(LocationType.PlayerBusTokenTeamSpot).moveItemsAtOnce({ rotation: MaterialRotation.FaceUp }))
    for (let teamNumber = 1; teamNumber <= roundNumber; teamNumber++) {
      moves.push(
        ...this.game.players.map((player) => {
          return this.material(MaterialType.HockeyPlayerCard)
            .location(LocationType.PlayerHockeyPlayerTeamSpot)
            .player(player)
            .locationId(teamNumber)
            .rotation(MaterialRotation.FaceDown)
            .moveItemsAtOnce({ rotation: MaterialRotation.FaceUp })
        })
      )
    }
    moves.push(this.startSimultaneousRule(RuleId.DraftRoundPhaseMatchScore))
    return moves
  }
}
