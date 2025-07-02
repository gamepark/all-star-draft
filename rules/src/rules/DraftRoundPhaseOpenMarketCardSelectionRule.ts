import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'
import { Memorize } from '../Memorize'

export class DraftRoundPhaseOpenMarketCardSelectionRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  onRuleStart(_move: RuleMove<PlayerColor>, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerOpenMarketDraftLocator).getItems().length === 0)
      return this.material(MaterialType.HockeyPlayerCard)
        .location(LocationType.HockeyPlayerDeckSpot)
        .deck()
        .deal({ type: LocationType.HockeyPlayerOpenMarketDraftLocator }, 3)
    return []
  }

  getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerOpenMarketDraftLocator).moveItems({
      type: LocationType.PlayerHockeyPlayerHandSpot,
      player: this.player
    })
  }

  afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
      move.location.type === LocationType.PlayerHockeyPlayerHandSpot &&
      move.location.player !== undefined
    ) {
      const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
      if (this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerOpenMarketDraftLocator).length === 1) {
        moves.push(this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerOpenMarketDraftLocator).deleteItem())
      }
      if (
        this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerHandSpot).length ===
        10 + 2 * this.remind<number>(Memorize.RoundNumber) // 5 card + 1 left per round for the two players
      ) {
        const isFirstRound = this.remind(Memorize.RoundNumber) === 1
        moves.push(this.startSimultaneousRule(isFirstRound ? RuleId.DraftRoundPhaseTeamCreation : RuleId.DraftRoundPhaseTeamExchange))
      } else {
        if (this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerOpenMarketDraftLocator).length === 1) {
          moves.push(this.startPlayerTurn(RuleId.DraftRoundPhaseOpenMarketCardSelection, this.player))
        } else {
          moves.push(this.startPlayerTurn(RuleId.DraftRoundPhaseOpenMarketCardSelection, this.nextPlayer))
        }
      }
      return moves
    }
    return []
  }
}
