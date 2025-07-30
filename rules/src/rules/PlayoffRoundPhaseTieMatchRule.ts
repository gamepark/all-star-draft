import { isMoveItemType, ItemMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialRotation } from '../material/MaterialRotation'
import { MaterialType } from '../material/MaterialType'
import { playoffFanPoint } from '../material/PlayoffPointCard'
import { Memory } from '../Memory'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class PlayoffRoundPhaseTieMatchRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId> {
  onRuleStart(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const moves: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] = []
    const currentLowestPosition = this.game.players.filter((player) => this.material(MaterialType.HockeyPlayerCard).player(player).length > 0).length
    const lastPlayers = this.activePlayers
    // Players who cannot participate score points and are eliminated
    const playersToBeEliminated = lastPlayers.filter(
      (player) => this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerHandSpot).player(player).getItems().length === 0
    )
    if (playersToBeEliminated.length > 0) {
      moves.push(
        ...playersToBeEliminated.map((player) => {
          this.memorize<number>(Memory.ScorePlayoff, playoffFanPoint[this.game.players.length][currentLowestPosition - 1], player)
          return this.material(MaterialType.HockeyPlayerCard).player(player).deleteItemsAtOnce()
        })
      )
      const hockeyPlayerCardsMaterial = this.material(MaterialType.HockeyPlayerCard)
      const stillActivePlayers = this.game.players
        .filter((player) => !playersToBeEliminated.includes(player))
        .filter((player) => hockeyPlayerCardsMaterial.player(player).length > 0)
      if (stillActivePlayers.length - playersToBeEliminated.length < 2) {
        if (stillActivePlayers.length === 1) {
          this.memorize<number>(Memory.ScorePlayoff, playoffFanPoint[this.game.players.length][0], stillActivePlayers[0])
        }
        moves.push(stillActivePlayers.length > 1 ? this.startSimultaneousRule(RuleId.PlayoffSubstitutePlayers, stillActivePlayers) : this.endGame())
      }
    }
    return moves
  }

  getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerHandSpot).player(player).moveItems({
      type: LocationType.PlayerHockeyPlayerTeamSpot,
      id: 3,
      player: player,
      rotation: MaterialRotation.FaceDown
    })
  }

  afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
      move.location.id === 3 &&
      move.location.type === LocationType.PlayerHockeyPlayerTeamSpot &&
      move.location.player !== undefined &&
      this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).player(move.location.player).locationId(move.location.id)
        .length === 1
    ) {
      return [this.endPlayerTurn<PlayerColor>(move.location.player)]
    }
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
    const activePlayers = this.game.players.filter((player) => this.material(MaterialType.HockeyPlayerCard).player(player).length > 0)
    moves.push(
      // Move and reveal card changed by the player between matches
      this.material(MaterialType.HockeyPlayerCard)
        .location(LocationType.PlayerHockeyPlayerTeamSpot)
        .locationId(3)
        .moveItemsAtOnce({ rotation: MaterialRotation.FaceUp }),
      this.startSimultaneousRule(RuleId.PlayoffRoundPhaseScore, activePlayers)
    )
    return moves
  }
}
