import { isMoveItemType, ItemMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'
import { MaterialRotation } from '../material/MaterialRotation'

export class DraftRoundPhaseClashCardSelectionForOpponentRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId> {
  getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const opponent = this.game.players.find((p) => p !== player)
    return this.material(MaterialType.HockeyPlayerCard)
      .location(LocationType.HockeyPlayerDraftSpot)
      .player(player)
      .moveItems({ type: LocationType.PlayerHockeyPlayerHandSpot, player: opponent, rotation: MaterialRotation.FaceDown })
  }

  afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
      move.location.type === LocationType.PlayerHockeyPlayerHandSpot &&
      move.location.rotation === MaterialRotation.FaceDown
    ) {
      const player = this.game.players.find((p) => p !== move.location.player)!
      return [this.endPlayerTurn(player)]
    }
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
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
