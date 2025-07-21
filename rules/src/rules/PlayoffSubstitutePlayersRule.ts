import { isMoveItemType, ItemMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { HockeyPlayerCard } from '../material/HockeyPlayerCard'
import { LocationType } from '../material/LocationType'
import { MaterialRotation } from '../material/MaterialRotation'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class PlayoffSubstitutePlayersRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId> {
  getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    if (this.isFirstPlayOffRound()) {
      return this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerHandSpot).player(player).moveItems({
        type: LocationType.PlayerHockeyPlayerTeamSpot,
        player: player,
        id: 2,
        rotation: MaterialRotation.FaceDown
      })
    } else {
      const moves: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] = []
      if (this.canPlayerDiscardHockeyPlayers(player)) {
        moves.push(...this.buildDeleteFaceUpCardsInPlayerHand(player))
      }
      if (this.canPlayerSwapHockeyPlayers(player)) {
        moves.push(...this.buildSwapMovesForPlayer(player))
      }
      if (!this.isPlayerTeamComplete(player)) {
        moves.push(
          ...this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerHandSpot).player(player).moveItems({
            type: LocationType.PlayerHockeyPlayerTeamSpot,
            player: player,
            id: 2,
            rotation: MaterialRotation.FaceDown
          })
        )
      }
      if (this.isPlayerTeamValid(player)) {
        moves.push(this.endPlayerTurn(player))
      }
      return moves
    }
  }

  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const playersNotEliminated = this.game.players.filter((player) => this.material(MaterialType.HockeyPlayerCard).player(player).length > 0)
    return [this.startSimultaneousRule(RuleId.PlayoffRoundPhaseTeamReveal, playersNotEliminated)]
  }

  public beforeItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
      move.location.type === LocationType.PlayerHockeyPlayerTeamSpot &&
      move.location.id === 2 &&
      move.location.x !== undefined
    ) {
      return [
        this.material(MaterialType.HockeyPlayerCard)
          .location(LocationType.PlayerHockeyPlayerTeamSpot)
          .locationId(2)
          .player(move.location.player)
          .location((l) => l.x === move.location.x)
          .deleteItem()
      ]
    }
    return []
  }

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    if (this.isFirstPlayOffRound()) {
      if (
        isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
        move.location.type === LocationType.PlayerHockeyPlayerTeamSpot &&
        move.location.id === 2 &&
        move.location.rotation === MaterialRotation.FaceDown &&
        move.location.player !== undefined &&
        this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).locationId(2).player(move.location.player).length === 5
      ) {
        return [this.endPlayerTurn(move.location.player)]
      }
    }
    return []
  }

  public isFirstPlayOffRound(): boolean {
    const allPlayersHaveAllCards = this.game.players.every((player) => this.material(MaterialType.HockeyPlayerCard).player(player).length === 18)
    const playerCount = this.game.players.length
    const playOffsTokensCount = this.material(MaterialType.PlayoffTicketToken).length
    return allPlayersHaveAllCards && ((playerCount === 2 && playOffsTokensCount === 4) || (playerCount === 3 && playOffsTokensCount === 3) || playerCount > 3)
  }

  private buildDeleteFaceUpCardsInPlayerHand(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return this.material(MaterialType.HockeyPlayerCard)
      .location(LocationType.PlayerHockeyPlayerTeamSpot)
      .locationId(2)
      .player(player)
      .rotation<MaterialRotation>((r) => r !== MaterialRotation.FaceDown)
      .deleteItems()
  }

  private isPlayerTeamComplete(player: PlayerColor): boolean {
    return this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).locationId(2).player(player).length === 5
  }

  private buildSwapMovesForPlayer(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.material(MaterialType.HockeyPlayerCard)
      .location(LocationType.PlayerHockeyPlayerTeamSpot)
      .locationId(2)
      .player(player)
      .rotation<MaterialRotation>((r) => r !== MaterialRotation.FaceDown)
      .getItems<HockeyPlayerCard>()
      .flatMap((card) =>
        this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerHandSpot).player(player).moveItems({
          type: LocationType.PlayerHockeyPlayerTeamSpot,
          id: 2,
          player: player,
          rotation: MaterialRotation.FaceDown,
          x: card.location.x
        })
      )
  }

  private canPlayerSwapHockeyPlayers(player: PlayerColor): boolean {
    const playerTeamMaterial = this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).locationId(2).player(player)
    return (
      playerTeamMaterial.rotation(MaterialRotation.FaceDown).length < 4 &&
      playerTeamMaterial.rotation<MaterialRotation>((r) => r !== MaterialRotation.FaceDown).length > 1
    )
  }

  private canPlayerDiscardHockeyPlayers(player: PlayerColor): boolean {
    return (
      this.material(MaterialType.HockeyPlayerCard)
        .location(LocationType.PlayerHockeyPlayerTeamSpot)
        .locationId(2)
        .player(player)
        .rotation((r) => r !== MaterialRotation.FaceDown).length > 1
    )
  }

  private isPlayerTeamValid(player: PlayerColor): boolean {
    const playerTeamMaterial = this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).locationId(2).player(player)
    const faceDownTeamMaterial = playerTeamMaterial.rotation<MaterialRotation>((r) => r === MaterialRotation.FaceDown)
    return playerTeamMaterial.length === 5 && faceDownTeamMaterial.length > 1 && faceDownTeamMaterial.length < 5
  }
}
