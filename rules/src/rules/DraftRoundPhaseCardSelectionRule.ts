import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext, RuleMove, RuleStep, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'
import { Memorize } from '../Memorize'
import { RegularSeasonGameMode } from '../RegularSeasonGameMode'

export class DraftRoundPhaseCardSelectionRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  onRuleStart(_move: RuleMove<PlayerColor>, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
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
        this.remind<RegularSeasonGameMode>(Memorize.GameMode) === RegularSeasonGameMode.Duel &&
        this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot).player(move.location.player).length === 7
      )
        return []
      this.memorize(Memorize.CurrentTeamNumber, 1, move.location.player)
      return [this.endPlayerTurn<PlayerColor>(move.location.player)]
    }
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const draftCards = this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot)

    // If cards are left in the draft
    if (draftCards.length > 0) {
      if (this.game.players.length === 2 && this.remind<RegularSeasonGameMode>(Memorize.GameMode) === RegularSeasonGameMode.Duel) {
        return [this.startSimultaneousRule(RuleId.DraftRoundPhaseClashCardSelectionForOpponent)]
      }
      const moveCards = this.game.players.map((player) => {
        const nextPlayer = this.game.players[(this.game.players.indexOf(player) + 1) % this.game.players.length]
        return draftCards.player(player).moveItemsAtOnce({
          type: LocationType.HockeyPlayerDraftSpot,
          player: nextPlayer
        })
      })
      return [...moveCards, this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.DraftRoundPhaseCardSelection)]
    }

    // If no cards are left
    const gameMode = this.remind<RegularSeasonGameMode>(Memorize.GameMode)
    if (this.game.players.length === 2 && [RegularSeasonGameMode.Heritage, RegularSeasonGameMode.Duel].includes(gameMode)) {
      return [this.startSimultaneousRule(RuleId.DraftRoundPhaseDiscardCardOverflow)]
    }

    if (this.remind(Memorize.RoundNumber) > 1) {
      return [this.startSimultaneousRule(RuleId.DraftRoundPhaseTeamExchange)]
    }
    return [this.startSimultaneousRule(RuleId.DraftRoundPhaseTeamCreation)]
  }
}
