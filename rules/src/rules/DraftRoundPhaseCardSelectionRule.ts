import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext, RuleMove, RuleStep, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class DraftRoundPhaseCardSelectionRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  onRuleStart(_move: RuleMove<PlayerColor>, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.game.players.map((player) =>
      this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot).player(player).deck().shuffle()
    )
  }

  getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot).player(player).moveItems({
      type: LocationType.PlayerHockeyPlayerHandSpot,
      player: player
    })
  }

  afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
      move.location.type === LocationType.PlayerHockeyPlayerHandSpot &&
      move.location.player !== undefined
    ) {
      return [this.endPlayerTurn<PlayerColor>(move.location.player)]
    }
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot).length > 0) {
      return [
        ...this.game.players.map((player) => {
          const nextPlayer = this.game.players[(this.game.players.indexOf(player) + 1) % this.game.players.length]
          return this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot).player(player).moveItemsAtOnce({
            type: LocationType.HockeyPlayerDraftSpot,
            player: nextPlayer
          })
        }),
        this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.DraftRoundPhaseCardSelection)
      ]
    } else {
      return [this.startSimultaneousRule(RuleId.DraftRoundPhaseTeamExchange)]
    }
  }
}
