import { MaterialMove, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'
import { Memorize } from '../Memorize'
import { MaterialRotation } from '../material/MaterialRotation'
import { BusTokenId } from '../material/BusToken'

export class DraftRoundPhaseTeamRevealRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  onRuleStart(_move: RuleMove<PlayerColor>, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
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
            ...this.material(MaterialType.HockeyPlayerCard)
              .location(LocationType.PlayerHockeyPlayerTeamSpot)
              .player(player)
              .locationId(teamNumber)
              .rotateItems(MaterialRotation.FaceUp)
          ]
        })
      )
    }
    moves.push(
      ...this.material(MaterialType.BusToken)
        .location(LocationType.PlayerBusTokenTeamSpot)
        .moveItems((item) => ({ type: LocationType.PlayerBusTokenReserveSpot, player: (item.id as BusTokenId).back, rotation: MaterialRotation.FaceDown })),
      this.startSimultaneousRule(RuleId.DraftRoundSetupDrawCards)
    ) // Todo : change when implementing next rule
    return moves
  }
}
