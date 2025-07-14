import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memorize } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { TwoPlayersMode } from '../TwoPlayersMode'
import { RuleId } from './RuleId'

export class DraftRoundPhaseCardSelectionRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  onRuleStart(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const hasOneCardLeft = this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot).length === this.game.players.length
    if (hasOneCardLeft)
      return [
        ...this.material(MaterialType.HockeyPlayerCard)
          .location(LocationType.HockeyPlayerDraftSpot)
          .moveItems((item) => ({ type: LocationType.PlayerHockeyPlayerHandSpot, player: item.location.player }))
      ]
    return []
  }

  getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot).player(player).moveItems({
      type: LocationType.PlayerHockeyPlayerHandSpot,
      player: player
    })
  }

  beforeItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
      move.location.type === LocationType.PlayerHockeyPlayerHandSpot &&
      move.location.player !== undefined
    ) {
      if (
        this.remind<TwoPlayersMode>(Memorize.GameMode) === TwoPlayersMode.Clash &&
        this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot).player(move.location.player).length === 7
      )
        return []
      this.memorize(Memorize.CurrentTeamNumber, 1, move.location.player)
      return [this.endPlayerTurn<PlayerColor>(move.location.player)]
    }
    return []
  }

  getNextPlayer(player: PlayerColor) {
    return this.remind(Memorize.RoundNumber) % 2 === 1
      ? this.game.players[(this.game.players.indexOf(player) + 1) % this.game.players.length]
      : this.game.players[(this.game.players.indexOf(player) + this.game.players.length - 1) % this.game.players.length]
  }

  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const draftCards = this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot)

    // If cards are left in the draft
    if (draftCards.length > 0) {
      if (this.game.players.length === 2 && this.remind<TwoPlayersMode>(Memorize.GameMode) === TwoPlayersMode.Clash) {
        return [this.startSimultaneousRule(RuleId.DraftRoundPhaseClashCardSelectionForOpponent)]
      }
      const moves: MaterialMove[] = []
      for (const player of this.game.players) {
        const playerDraftCards = draftCards.player(player)
        const nextPlayer = this.getNextPlayer(player)
        moves.push(playerDraftCards.moveItemsAtOnce({ type: LocationType.HockeyPlayerDraftSpot, player: nextPlayer }))
        if (playerDraftCards.length > 1) {
          moves.push(playerDraftCards.shuffle())
        }
      }
      moves.push(this.startSimultaneousRule(RuleId.DraftRoundPhaseCardSelection))
      return moves
    }

    // If no cards are left
    const gameMode = this.remind<TwoPlayersMode>(Memorize.GameMode)
    if (this.game.players.length === 2 && [TwoPlayersMode.Heritage, TwoPlayersMode.Clash].includes(gameMode)) {
      return [this.startSimultaneousRule(RuleId.DraftRoundPhaseDiscardCardOverflow)]
    }

    if (this.remind(Memorize.RoundNumber) > 1) {
      return [this.startSimultaneousRule(RuleId.DraftRoundPhaseTeamExchange)]
    }
    return [this.startSimultaneousRule(RuleId.DraftRoundPhaseTeamCreation)]
  }
}
