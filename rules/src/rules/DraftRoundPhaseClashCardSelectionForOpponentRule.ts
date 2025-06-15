import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'
import { Memorize } from '../Memorize'

export class DraftRoundPhaseClashCardSelectionForOpponentRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot).player(player).moveItems({
      type: LocationType.HockeyPlayerDraftSpot,
      player: player,
      z: 1
    })
  }

  afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
      move.location.type === LocationType.HockeyPlayerDraftSpot &&
      move.location.z === 1 &&
      move.location.player !== undefined
    ) {
      this.memorize(Memorize.CurrentTeamNumber, 1, move.location.player)
      return [this.endPlayerTurn<PlayerColor>(move.location.player)]
    }
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = this.game.players.map((player) => {
      const nextPlayer = this.game.players[(this.game.players.indexOf(player) + 1) % this.game.players.length]
      return this.material(MaterialType.HockeyPlayerCard)
        .location((location) => location.type === LocationType.HockeyPlayerDraftSpot && location.z === 1)
        .player(player)
        .moveItem({
          type: LocationType.PlayerHockeyPlayerHandSpot,
          player: nextPlayer
        })
    })
    if (
      this.material(MaterialType.HockeyPlayerCard).location((location) => location.type === LocationType.HockeyPlayerDraftSpot && location.z !== 1).length > 0
    ) {
      moves.push(
        ...this.game.players.map((player) => {
          const nextPlayer = this.game.players[(this.game.players.indexOf(player) + 1) % this.game.players.length]
          return this.material(MaterialType.HockeyPlayerCard)
            .location((location) => location.type === LocationType.HockeyPlayerDraftSpot && location.z !== 1)
            .player(player)
            .moveItemsAtOnce({
              type: LocationType.HockeyPlayerDraftSpot,
              player: nextPlayer
            })
        }),
        this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.DraftRoundPhaseCardSelection)
      )
      return moves
    }
    return [...moves, this.startSimultaneousRule(RuleId.DraftRoundPhaseDiscardCardOverflow)]
  }
}
