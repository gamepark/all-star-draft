import { MaterialMove, PlayMoveContext, RuleMove, RuleStep, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class DraftRoundPhaseTeamExchangeRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  onRuleStart(_move: RuleMove<PlayerColor>, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    // const roundNumber = this.remind<number>(Memorize.RoundNumber)
    // const teamNumber = this.remind<number>(Memorize.CurrentTeamNumber)
    // if (teamNumber >= roundNumber) return [this.startSimultaneousRule(RuleId.DraftRoundPhaseTeamCreation)]
    return [this.startSimultaneousRule(RuleId.DraftRoundPhaseTeamCreation)] // Todo : Decomment & complete
  }
  getActivePlayerLegalMoves(_player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return []
  }
  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return []
  }
}
