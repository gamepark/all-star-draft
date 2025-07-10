import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialRotation } from '../material/MaterialRotation'
import { MaterialType } from '../material/MaterialType'
import { Memorize } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class DraftRoundPhaseTeamRevealRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  onRuleStart(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
    for (let teamNumber = 1; teamNumber <= this.remind(Memorize.RoundNumber); teamNumber++) {
      moves.push(
        ...this.game.players.flatMap((player) => {
          return [
            this.material(MaterialType.BusToken)
              .location(LocationType.PlayerBusTokenTeamSpot)
              .player(player)
              .locationId(teamNumber)
              .rotateItem(MaterialRotation.FaceUp),
            this.material(MaterialType.HockeyPlayerCard)
              .location(LocationType.PlayerHockeyPlayerTeamSpot)
              .player(player)
              .locationId(teamNumber)
              .rotation(MaterialRotation.FaceDown)
              .moveItemsAtOnce({ type: LocationType.PlayerHockeyPlayerTeamSpot, id: teamNumber, player: player, rotation: MaterialRotation.FaceUp })
          ]
        })
      )
    }
    moves.push(this.startSimultaneousRule(RuleId.DraftRoundPhaseMatchMoveToStadium))
    return moves
  }
}
