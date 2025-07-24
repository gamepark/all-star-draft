import { isMoveItemType, ItemMove, Location, MaterialMove, PlayMoveContext, SimultaneousRule } from '@gamepark/rules-api'
import { HockeyPlayerCard } from '../material/HockeyPlayerCard'
import { LocationType } from '../material/LocationType'
import { MaterialRotation } from '../material/MaterialRotation'
import { MaterialType } from '../material/MaterialType'
import { Memory } from '../Memory'
import { PlayerColor } from '../PlayerColor'
import { TwoPlayersMode } from '../TwoPlayersMode'
import { RuleId } from './RuleId'

export class DraftRoundPhaseCardSelectionRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId> {
  public getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const is2PlayerClashGame = this.is2playersClashGame()
    const playerDraftCardsCount = this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot).player(player).length
    const destinationPlayer =
      is2PlayerClashGame && playerDraftCardsCount % 2 === 1 && playerDraftCardsCount !== 7 ? this.game.players.find((p) => p !== player)! : player
    const destinationLocation: Location<PlayerColor, LocationType, MaterialRotation> = {
      type: LocationType.PlayerHockeyPlayerHandSpot,
      player: destinationPlayer
    }
    if (destinationPlayer !== player) {
      destinationLocation.rotation = MaterialRotation.FaceDown
    }
    return this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot).player(player).moveItems(destinationLocation)
  }

  public beforeItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
      move.location.type === LocationType.PlayerHockeyPlayerHandSpot
    ) {
      const movedCard = this.material(MaterialType.HockeyPlayerCard).index(move.itemIndex).getItem<HockeyPlayerCard>()!
      if (
        (this.is2playersClashGame() && movedCard.location.player !== move.location.player) ||
        (!this.is2playersClashGame() && movedCard.location.player === move.location.player)
      ) {
        return [this.endPlayerTurn(movedCard.location.player!)]
      }
    }
    return []
  }

  public afterItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    if (
      this.is2playersClashGame() &&
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
      move.location.type === LocationType.PlayerHockeyPlayerHandSpot &&
      move.location.player !== undefined &&
      this.activePlayers.length === 0
    ) {
      return [this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerHandSpot).player(move.location.player).shuffle()]
    }
    return super.afterItemMove(move, _context)
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const draftCards = this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot)
    if (draftCards.length > 0) {
      const roundNumber = this.material(MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot).length
      const playersOrder = roundNumber % 2 === 1 ? this.game.players : [...this.game.players].reverse()
      const moves = playersOrder.flatMap((player): MaterialMove<PlayerColor, MaterialType, LocationType>[] => {
        const playerDraftCards = draftCards.player(player)
        const nextPlayer = this.getNextPlayer(player)
        if (playerDraftCards.length > 1) {
          const baseMoves: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] = [
            playerDraftCards.moveItemsAtOnce({ type: LocationType.HockeyPlayerDraftSpot, player: nextPlayer }),
            playerDraftCards.shuffle()
          ]
          return this.is2playersClashGame()
            ? (
                this.material(MaterialType.HockeyPlayerCard)
                  .location(LocationType.PlayerHockeyPlayerHandSpot)
                  .rotation<MaterialRotation>(MaterialRotation.FaceDown)
                  .rotateItems<MaterialRotation>(undefined) as MaterialMove<PlayerColor, MaterialType, LocationType>[]
              ).concat(baseMoves)
            : baseMoves
        } else if (playerDraftCards.length === 1) {
          return [playerDraftCards.moveItem({ type: LocationType.PlayerHockeyPlayerHandSpot, player: nextPlayer })]
        } else {
          return []
        }
      })
      return moves.concat(
        this.startSimultaneousRule(draftCards.length !== this.game.players.length ? RuleId.DraftRoundPhaseCardSelection : RuleId.DraftRoundPhaseTeamCreation)
      )
    } else if (this.is2playersClashGame()) {
      return [
        ...this.material(MaterialType.HockeyPlayerCard)
          .location(LocationType.PlayerHockeyPlayerHandSpot)
          .rotation<MaterialRotation>(MaterialRotation.FaceDown)
          .rotateItems<MaterialRotation>(undefined),
        this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.DraftRoundPhaseTeamCreation)
      ]
    }
    return []
  }

  public is2playersClashGame(): boolean {
    return this.game.players.length === 2 && this.remind<TwoPlayersMode>(Memory.GameMode) === TwoPlayersMode.Clash
  }

  private getNextPlayer(player: PlayerColor) {
    const roundNumber = this.material(MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot).length
    return roundNumber % 2 === 1
      ? this.game.players[(this.game.players.indexOf(player) + 1) % this.game.players.length]
      : this.game.players[(this.game.players.indexOf(player) + this.game.players.length - 1) % this.game.players.length]
  }
}
