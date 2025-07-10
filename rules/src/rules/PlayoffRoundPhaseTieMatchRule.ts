import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext, SimultaneousRule } from '@gamepark/rules-api'
import { difference, intersection } from 'lodash'
import { LocationType } from '../material/LocationType'
import { MaterialRotation } from '../material/MaterialRotation'
import { MaterialType } from '../material/MaterialType'
import { playoffFanPoint } from '../material/PlayoffPointCard'
import { Memorize } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class PlayoffRoundPhaseTieMatchRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  onRuleStart(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
    const currentLowestPosition = this.remind<PlayerColor[]>(Memorize.ActivePlayers).length
    const lastPlayers = this.remind<PlayerColor[]>(Memorize.LastPlayers)
    difference(this.game.players, lastPlayers).forEach((player) => moves.push(this.endPlayerTurn(player))) // Non last players don't need to play the tie breaker
    // Players who cannot participate score points and are eliminated
    lastPlayers.forEach((player) => {
      if (this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerHandSpot).player(player).getItems().length === 0) {
        this.memorize<number>(Memorize.ScorePlayoff, playoffFanPoint[this.game.players.length][currentLowestPosition - 1], player)
        this.memorize<PlayerColor[]>(Memorize.ActivePlayers, (activePlayers) => activePlayers.filter((player) => player !== player))
        moves.push(
          this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).player(player).deleteItemsAtOnce(),
          this.endPlayerTurn(player)
        )
      }
    })
    this.memorize<PlayerColor[]>(Memorize.LastPlayers, intersection(lastPlayers, this.remind(Memorize.ActivePlayers)))
    return moves
  }

  getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerHandSpot).player(player).moveItems({
      type: LocationType.PlayerHockeyPlayerTeamSpot,
      id: 3,
      player: player,
      rotation: MaterialRotation.FaceDown
    })
  }

  afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
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

  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
    const lastPlayers = this.remind<PlayerColor[]>(Memorize.LastPlayers)
    moves.push(
      ...lastPlayers.flatMap((player) => [
        // Move and reveal card changed by the player between matchs
        this.material(MaterialType.HockeyPlayerCard)
          .location(LocationType.PlayerHockeyPlayerTeamSpot)
          .player(player)
          .locationId(3)
          .moveItemsAtOnce({ type: LocationType.PlayerHockeyPlayerTeamSpot, id: 3, player: player, rotation: MaterialRotation.FaceUp })
      ]),
      this.startSimultaneousRule(RuleId.PlayoffRoundPhaseScore)
    )
    return moves
  }
}
