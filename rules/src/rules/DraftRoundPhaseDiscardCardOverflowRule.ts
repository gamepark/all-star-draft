import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'
import { Memorize } from '../Memorize'
import { HockeyPlayerCard } from '../material/HockeyPlayerCard'

export class DraftRoundPhaseDiscardCardOverflowRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const cardsDrafted = this.material(MaterialType.HockeyPlayerCard)
      .location(LocationType.PlayerHockeyPlayerHandSpot)
      .player(player)
      .id((id) => !this.remind<HockeyPlayerCard[]>(Memorize.CardsAlreadyInHand, player).includes(id as HockeyPlayerCard))
    return cardsDrafted.moveItems({ type: LocationType.HockeyPlayerDraftSpot, player: player })
  }

  afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
      move.location.type === LocationType.HockeyPlayerDraftSpot &&
      move.location.player !== undefined &&
      this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot).player(move.location.player).length === 1
    ) {
      this.memorize(Memorize.CurrentTeamNumber, 1, move.location.player)
      return [this.endPlayerTurn<PlayerColor>(move.location.player)]
    }
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = [
      this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot).deleteItemsAtOnce()
    ]
    if (this.remind(Memorize.RoundNumber) > 1) moves.push(this.startSimultaneousRule(RuleId.DraftRoundPhaseTeamExchange))
    else moves.push(this.startSimultaneousRule(RuleId.DraftRoundPhaseTeamCreation))
    return moves
  }
}
