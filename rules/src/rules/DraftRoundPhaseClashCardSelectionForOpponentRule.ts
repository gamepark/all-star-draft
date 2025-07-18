import { isMoveItemType, ItemMove, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'
import { MaterialRotation } from '../material/MaterialRotation'

export class DraftRoundPhaseClashCardSelectionForOpponentRule extends SimultaneousRule {
  getActivePlayerLegalMoves(player: PlayerColor) {
    const opponent = this.game.players.find((p) => p !== player)
    return this.material(MaterialType.HockeyPlayerCard)
      .location(LocationType.HockeyPlayerDraftSpot)
      .player(player)
      .moveItems({ type: LocationType.PlayerHockeyPlayerHandSpot, player: opponent, rotation: MaterialRotation.FaceDown })
  }

  afterItemMove(move: ItemMove) {
    if (
      isMoveItemType(MaterialType.HockeyPlayerCard)(move) &&
      move.location.type === LocationType.PlayerHockeyPlayerHandSpot &&
      move.location.rotation === MaterialRotation.FaceDown
    ) {
      const player = this.game.players.find((p) => p !== move.location.player)!
      return [this.endPlayerTurn(player)]
    }
    return []
  }

  getMovesAfterPlayersDone() {
    const revealMoves = this.game.players.map((player) =>
      this.material(MaterialType.HockeyPlayerCard)
        .location(LocationType.PlayerHockeyPlayerHandSpot)
        .player(player)
        .rotation(MaterialRotation.FaceDown)
        .moveItem({ type: LocationType.PlayerHockeyPlayerHandSpot, player: player, rotation: MaterialRotation.FaceUp })
    )
    if (this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot).length > 0) {
      return [
        ...revealMoves,
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
    return [...revealMoves, this.startSimultaneousRule(RuleId.DraftRoundPhaseTeamCreation)]
  }
}
