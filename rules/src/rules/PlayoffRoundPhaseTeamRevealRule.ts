import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialRotation } from '../material/MaterialRotation'
import { MaterialType } from '../material/MaterialType'
import { Memorize } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class PlayoffRoundPhaseTeamRevealRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  onRuleStart(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const activePlayers = this.remind<PlayerColor[]>(Memorize.ActivePlayers)
    const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
    moves.push(
      ...activePlayers.flatMap((player) => [
        // Move and reveal card changed by the player between matchs
        this.material(MaterialType.HockeyPlayerCard)
          .location(LocationType.PlayerHockeyPlayerTeamSpot)
          .player(player)
          .locationId(2)
          .rotation(MaterialRotation.FaceDown)
          .moveItemsAtOnce({ type: LocationType.PlayerHockeyPlayerTeamSpot, id: 2, player: player, rotation: MaterialRotation.FaceUp })
      ])
    )
    moves.push(this.startSimultaneousRule(RuleId.PlayoffRoundPhaseMainMatch))
    return moves
  }
}
