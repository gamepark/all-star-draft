import { isMoveItemType, ItemMove, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class DraftRoundPhaseClashCardSelectionForOpponentRule extends SimultaneousRule {
  getActivePlayerLegalMoves(player: PlayerColor) {
    const opponent = this.game.players.find((p) => p !== player)
    return this.material(MaterialType.HockeyPlayerCard)
      .location(LocationType.HockeyPlayerDraftSpot)
      .player(player)
      .moveItems({ type: LocationType.PlayerHockeyPlayerHandSpot, player: opponent })
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.HockeyPlayerCard)(move) && move.location.type === LocationType.PlayerHockeyPlayerHandSpot) {
      const player = this.game.players.find((p) => p !== move.location.player)!
      return [this.endPlayerTurn(player)]
    }
    return []
  }

  getMovesAfterPlayersDone() {
    if (this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot).length > 0) {
      return [
        ...this.game.players.map((player) => {
          const nextPlayer = this.game.players[(this.game.players.indexOf(player) + 1) % this.game.players.length]
          return this.material(MaterialType.HockeyPlayerCard)
            .location(LocationType.HockeyPlayerDraftSpot)
            .player(player)
            .moveItemsAtOnce({ type: LocationType.HockeyPlayerDraftSpot, player: nextPlayer })
        }),
        this.startSimultaneousRule(RuleId.DraftRoundPhaseCardSelection)
      ]
    }
    return [this.startSimultaneousRule(RuleId.DraftRoundPhaseDiscardCardOverflow)]
  }
}
